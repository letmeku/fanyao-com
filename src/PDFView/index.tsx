import React, { useEffect, useRef, useCallback, useState, RefObject, ChangeEvent, FC, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Spin, Tooltip, Input, Progress } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import './index.less';
// @ts-ignore
import { Document, Page, pdfjs } from 'react-pdf';
// @ts-ignore
import pdfjsWorker from 'react-pdf/dist/esm/pdf.worker.entry.js';
import { debounce } from 'lodash';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// 类型定义
interface Config {
  showPage?: boolean;
  zoom?: boolean;
  rotate?: boolean;
  screenScale?: boolean;
  thumbnails?: boolean;
  close?: boolean;
}

interface LazyLoadConfig {
  threshold?: number; // 加载阈值（像素）
  pagesPerLoad?: number; // 每次加载的页面数
}

interface Props {
  file?: string | null;
  parentDom?: HTMLDivElement | null;
  onClose?: () => void;
  operationConfig?: Config;
  width?: number;
  lazyLoad?: boolean;
  lazyLoadConfig?: LazyLoadConfig;
}

// 自定义 Hook：管理 PDF 状态和逻辑
const usePDFView = (
  file: string | null | undefined,
  defaultWidth: number,
  numPages: number,
  lazyLoad: boolean,
  lazyLoadConfig: LazyLoadConfig = {},
  pageDiv: RefObject<HTMLDivElement>
) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(defaultWidth);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [visiblePages, setVisiblePages] = useState<number[]>([1]);
  const MAX_VISIBLE_PAGES = 20;

  // 动态加载参数
  const defaultThreshold = navigator.hardwareConcurrency > 4 ? 300 : 150;
  const defaultPagesPerLoad = navigator.hardwareConcurrency > 4 ? 5 : 2;
  const { threshold = defaultThreshold, pagesPerLoad = defaultPagesPerLoad } = lazyLoadConfig;

  // 页面导航
  const lastPage = useCallback(() => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  }, [pageNumber]);

  const nextPage = useCallback(() => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  }, [pageNumber, numPages]);

  const onPageNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Math.min(numPages, Number(e.target.value) || 1));
      setPageNumber(value);
      // if (!lazyLoad && !showThumbnails) {
      //   setVisiblePages([value]);
      // }
    },
    [numPages, lazyLoad, showThumbnails]
  );

  // 缩放与全屏
  const pageZoomIn = useCallback(() => setPageWidth((prev) => prev * 1.2), []);
  const pageZoomOut = useCallback(
    () => pageWidth > defaultWidth && setPageWidth((prev) => prev * 0.8),
    [pageWidth, defaultWidth]
  );

  const pageFullscreen = useCallback(
    (parent: HTMLElement) => {
      setPageWidth(fullscreen ? defaultWidth : parent.offsetWidth - 50);
      setFullscreen(!fullscreen);
    },
    [fullscreen, defaultWidth]
  );

  // 旋转与缩略图
  const rotateLeft = useCallback(() => setRotation((prev) => (prev - 90) % 360), []);
  const rotateRight = useCallback(() => setRotation((prev) => (prev + 90) % 360), []);
  const toggleThumbnails = useCallback(() => setShowThumbnails((prev) => !prev), []);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case '+':
            e.preventDefault();
            pageZoomIn();
            break;
          case '-':
            e.preventDefault();
            pageZoomOut();
            break;
          case 'f':
            e.preventDefault();
            pageFullscreen(document.body);
            break;
          case 't':
            e.preventDefault();
            toggleThumbnails();
            break;
        }
      } else {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            lastPage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextPage();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lastPage, nextPage, pageZoomIn, pageZoomOut, pageFullscreen, toggleThumbnails]);

  // 更新可见页面
  useEffect(() => {
    if (lazyLoad && !showThumbnails) {
      const start = Math.max(1, pageNumber);
      const end = Math.min(numPages, pageNumber + 2);
      let newVisiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

      // 限制窗口大小，移除较远的页面
      if (newVisiblePages.length > MAX_VISIBLE_PAGES) {
        const mid = Math.floor((start + end) / 2);
        newVisiblePages = newVisiblePages.filter(
          (page) => Math.abs(page - mid) <= Math.floor(MAX_VISIBLE_PAGES / 2)
        );
      }

      setVisiblePages(newVisiblePages);
    } else if (!showThumbnails) {
      setVisiblePages([pageNumber]);
    } else {
      const start = Math.max(1, pageNumber - 2);
      const end = Math.min(numPages, pageNumber + 2);
      setVisiblePages(Array.from({ length: end - start + 1 }, (_, i) => start + i));
    }
  }, [pageNumber, showThumbnails, numPages, lazyLoad]);

  // 懒加载逻辑
  useEffect(() => {
    if (!lazyLoad || showThumbnails || !pageDiv.current) return;

    const handleScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } = pageDiv.current!;
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        setVisiblePages((prev) => {
          const maxLoadedPage = Math.max(...prev);
          const nextPages = Array.from(
            { length: Math.min(pagesPerLoad, numPages - maxLoadedPage) },
            (_, i) => maxLoadedPage + i + 1
          );
          let newPages = Array.from([...prev, ...nextPages]).sort((a, b) => a - b);

          // 限制窗口大小
          if (newPages.length > MAX_VISIBLE_PAGES) {
            const mid = Math.floor((newPages[0] + newPages[newPages.length - 1]) / 2);
            newPages = newPages.filter(
              (page) => Math.abs(page - mid) <= Math.floor(MAX_VISIBLE_PAGES / 2)
            );
          }

          return newPages;
        });
      }
    }, 100);

    const div = pageDiv.current;
    div.addEventListener('scroll', handleScroll);
    return () => {
      div.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [lazyLoad, showThumbnails, numPages, threshold, pagesPerLoad]);

  // 重置页面
  useEffect(() => {
    setPageNumber(1);
    setVisiblePages([1]);
  }, [file]);
  // 滚动到顶部
  useEffect(() => {
    if (pageDiv.current) {
      pageDiv.current.scrollTop = 0;
    }
  }, [pageNumber]);

  return {
    pageNumber,
    pageWidth,
    fullscreen,
    rotation,
    showThumbnails,
    visiblePages,
    lastPage,
    nextPage,
    onPageNumberChange,
    pageZoomIn,
    pageZoomOut,
    pageFullscreen,
    rotateLeft,
    rotateRight,
    toggleThumbnails,
    setVisiblePages,
    setPageNumber,
  };
};

const PDFView: FC<Props> = ({
  file,
  parentDom,
  onClose,
  operationConfig = {},
  width = 600,
  lazyLoad = false,
  lazyLoadConfig = {},
}) => {
  const pageDiv = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const {
    zoom = true,
    rotate = true,
    screenScale = true,
    thumbnails = true,
    close = true,
    showPage = true,
  } = operationConfig;
  const parent = parentDom || document.body;

  const {
    pageNumber,
    pageWidth,
    fullscreen,
    rotation,
    showThumbnails,
    visiblePages,
    lastPage,
    nextPage,
    onPageNumberChange,
    pageZoomIn,
    pageZoomOut,
    pageFullscreen,
    rotateLeft,
    rotateRight,
    toggleThumbnails,
    setPageNumber,
  } = usePDFView(file, width, numPages, lazyLoad, lazyLoadConfig, pageDiv);


  // 加载 PDF 元信息
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  // 页面加载完成
  const onPageLoadSuccess = useCallback((page: number) => {
    setLoadedPages((prev) => new Set(prev).add(page));
  }, []);


  // 缓存页面渲染
  const renderPage = useMemo(() => {
    return (page: number) => (
      <div key={`page-${page}`} className="pdf-page-container">
        <div className="pdf-page-content" style={{
          background: '#fff', // 页面内容保持白色背景
          margin: '0 auto', // 水平居中
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // 保留原有阴影
        }}>
          <Page
            key={page}
            pageNumber={page}
            width={pageWidth}
            rotate={rotation}
            loading={<Spin size="large" />}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onLoadSuccess={() => onPageLoadSuccess(page)}
            onLoadError={() => setPageNumber(1)}
            renderMode="canvas"
          />
        </div>
      </div>
    );
  }, [pageWidth, rotation, onPageLoadSuccess]);

  const renderContent = () => (
    <div className="view">
      <div className="viewContent">
        <div className="pageMain" ref={pageDiv}>
          <div className="pageContainer">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setLoading(false)}
              error={
                <div style={{ textAlign: 'center', width: `${width}px` }}>
                  <ExclamationCircleOutlined style={{ fontSize: '150px', color: '#fe725c', margin: '100px' }} />
                  <p>加载失败</p>
                </div>
              }
              loading={
                <div style={{ textAlign: 'center', width: `${width}px` }}>
                  <Spin size="large" style={{ margin: '200px' }} />
                </div>
              }
            >
              {showThumbnails ? (
                <div className="thumbnailContainer">
                  {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                    <div
                      key={page}
                      className={`thumbnail ${loadedPages.has(page) ? '' : 'loading'}`}
                      onClick={() => {
                        setPageNumber(page);
                        toggleThumbnails();
                      }}
                    >
                      {visiblePages.includes(page) ? (
                        <Page
                          pageNumber={page}
                          width={150}
                          rotate={rotation}
                          loading={<Spin />}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          onLoadSuccess={() => onPageLoadSuccess(page)}
                          renderMode="canvas"
                        />
                      ) : (
                        <div className="thumbnailPlaceholder">第 {page} 页</div>
                      )}
                      <span>第 {page} 页</span>
                    </div>
                  ))}
                </div>
              ) : (

                visiblePages.map(renderPage)
              )}
            </Document>
          </div>
        </div>
        <div className="pageBar">
          <div className="pageTool" role="toolbar" aria-label="PDF 导航工具栏">
            {showPage && <>
              <Tooltip title={pageNumber === 1 ? '已是第一页' : '上一页'}>
                <LeftOutlined
                  onClick={lastPage}
                  tabIndex={0}
                  role="button"
                  aria-label="上一页"
                  onKeyDown={(e) => e.key === 'Enter' && lastPage()}
                />
              </Tooltip>
              <Input
                value={pageNumber}
                onChange={debounce(onPageNumberChange, 500)}
                type="number"
                disabled={loading}
                aria-label={`当前页码，共 ${numPages} 页`}
              />
              <span aria-hidden="true"> / {numPages}</span>
              <Tooltip title={pageNumber === numPages ? '已是最后一页' : '下一页'}>
                <RightOutlined
                  onClick={nextPage}
                  tabIndex={0}
                  role="button"
                  aria-label="下一页"
                  onKeyDown={(e) => e.key === 'Enter' && nextPage()}
                />
              </Tooltip>
            </>}
            {zoom && (
              <Tooltip title="放大">
                <PlusCircleOutlined
                  onClick={pageZoomIn}
                  tabIndex={0}
                  role="button"
                  aria-label="放大"
                  onKeyDown={(e) => e.key === 'Enter' && pageZoomIn()}
                />
              </Tooltip>
            )}
            {zoom && (
              <Tooltip title="缩小">
                <MinusCircleOutlined
                  onClick={pageZoomOut}
                  tabIndex={0}
                  role="button"
                  aria-label="缩小"
                  onKeyDown={(e) => e.key === 'Enter' && pageZoomOut()}
                />
              </Tooltip>
            )}
            {rotate && (
              <Tooltip title="向左旋转">
                <RotateLeftOutlined
                  onClick={rotateLeft}
                  tabIndex={0}
                  role="button"
                  aria-label="向左旋转"
                  onKeyDown={(e) => e.key === 'Enter' && rotateLeft()}
                />
              </Tooltip>
            )}
            {rotate && (
              <Tooltip title="向右旋转">
                <RotateRightOutlined
                  onClick={rotateRight}
                  tabIndex={0}
                  role="button"
                  aria-label="向右旋转"
                  onKeyDown={(e) => e.key === 'Enter' && rotateRight()}
                />
              </Tooltip>
            )}
            {thumbnails && (
              <Tooltip title={showThumbnails ? '关闭缩略图' : '显示缩略图'}>
                <UnorderedListOutlined
                  onClick={toggleThumbnails}
                  tabIndex={0}
                  role="button"
                  aria-label={showThumbnails ? '关闭缩略图' : '显示缩略图'}
                  onKeyDown={(e) => e.key === 'Enter' && toggleThumbnails()}
                />
              </Tooltip>
            )}
            {screenScale && (
              <Tooltip title={fullscreen ? '恢复默认' : '适合窗口'}>
                {fullscreen ? (
                  <FullscreenExitOutlined
                    onClick={() => pageFullscreen(parent)}
                    tabIndex={0}
                    role="button"
                    aria-label="恢复默认"
                    onKeyDown={(e) => e.key === 'Enter' && pageFullscreen(parent)}
                  />
                ) : (
                  <FullscreenOutlined
                    onClick={() => pageFullscreen(parent)}
                    tabIndex={0}
                    role="button"
                    aria-label="适合窗口"
                    onKeyDown={(e) => e.key === 'Enter' && pageFullscreen(parent)}
                  />
                )}
              </Tooltip>
            )}
            {close && onClose && (
              <Tooltip title="关闭">
                <CloseCircleOutlined
                  onClick={onClose}
                  tabIndex={0}
                  role="button"
                  aria-label="关闭"
                  onKeyDown={(e) => e.key === 'Enter' && onClose()}
                />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!file) {
    return <div style={{ textAlign: 'center', width: `${width}px` }}>文件不存在</div>;
  }

  return parentDom ? renderContent() : createPortal(renderContent(), parent);
};

export default PDFView;
