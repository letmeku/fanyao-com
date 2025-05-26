import React, { useEffect, useRef, useCallback, useState, RefObject, ChangeEvent, FC, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Spin, Tooltip, Input } from 'antd';
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
import { usePDFView } from './utils';

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
    scrolledPage,
    setScrolledPage
  } = usePDFView(file, width, numPages, lazyLoad, lazyLoadConfig, pageDiv);


  // 加载 PDF 元信息
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log(numPages, 'numPages');
    setNumPages(numPages);
    setLoading(false);
  }, []);

  // 页面加载完成
  const onPageLoadSuccess = useCallback((page: number) => {
    setLoadedPages((prev) => new Set(prev).add(page));
  }, []);

useEffect(() => {
  if (!pageDiv.current || !numPages) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const page = parseInt(entry.target.getAttribute('data-page') || '1', 10);
          setScrolledPage(page);
        }
      });
    },
    {
      root: pageDiv.current,
      threshold: 0.5 // 当50%的页面可见时触发
    }
  );

  // 观察所有页面
  const pages = pageDiv.current.querySelectorAll('.pdf-page-container');
  pages.forEach(page => observer.observe(page));

  return () => observer.disconnect();
}, [numPages, visiblePages]);
console.log(visiblePages, 'visiblePages');

  // 缓存页面渲染
  const renderPage = useMemo(() => {
    return (page: number) => (
      <div key={`page-${page}`} data-page={page}  className="pdf-page-container">
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
                        setScrolledPage(page);
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
                  onClick={()=>lastPage(scrolledPage)}
                  tabIndex={0}
                  role="button"
                  aria-label="上一页"
                  onKeyDown={(e) => e.key === 'Enter' && lastPage(scrolledPage)}
                />
              </Tooltip>
              <Input
                value={scrolledPage}
                onChange={debounce(onPageNumberChange, 500)}
                type="number"
                disabled={loading}
                aria-label={`当前页码，共 ${numPages} 页`}
              />
              <span aria-hidden="true"> / {numPages}</span>
              <Tooltip title={pageNumber === numPages ? '已是最后一页' : '下一页'}>
                <RightOutlined
                  onClick={()=>nextPage(scrolledPage)}
                  tabIndex={0}
                  role="button"
                  aria-label="下一页"
                  onKeyDown={(e) => e.key === 'Enter' && nextPage(scrolledPage)}
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
