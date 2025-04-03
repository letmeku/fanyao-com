import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import  './index.less';
// @ts-ignore
import { Document, Page, pdfjs } from 'react-pdf';
// @ts-ignore
import pdfjsWorker from 'react-pdf/dist/esm/pdf.worker.entry.js';
// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFView = ({
  file,
  parentDom,
  onClose,
}: {
  file?: string | null;
  parentDom?: HTMLDivElement | null;
  onClose?: () => void;
}) => {
  const defaultWidth = 600;
  const pageDiv = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(defaultWidth);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [visiblePages, setVisiblePages] = useState<number[]>([1]); // 控制可见页面

  const parent = parentDom || document.body;

  // 加载 PDF 元信息，不渲染全部页面
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  const lastPage = () => pageNumber > 1 && setPageNumber(pageNumber - 1);
  const nextPage = () => pageNumber < numPages && setPageNumber(pageNumber + 1);
  const onPageNumberChange = (e: { target: { value: string } }) => {
    let value = Math.max(1, Math.min(numPages, Number(e.target.value) || 1));
    setPageNumber(value);
    setVisiblePages([value]); // 只加载当前页
  };

  const pageZoomIn = () => setPageWidth(pageWidth * 1.2);
  const pageZoomOut = () => pageWidth > defaultWidth && setPageWidth(pageWidth * 0.8);
  const pageFullscreen = () => {
    setPageWidth(fullscreen ? defaultWidth : parent.offsetWidth - 50);
    setFullscreen(!fullscreen);
  };

  const rotateLeft = () => setRotation((prev) => (prev - 90) % 360);
  const rotateRight = () => setRotation((prev) => (prev + 90) % 360);
  const toggleThumbnails = () => setShowThumbnails(!showThumbnails);

  // 动态更新可见页面
  useEffect(() => {
    if (!showThumbnails) {
      setVisiblePages([pageNumber]);
    } else {
      // 缩略图模式下限制加载数量，避免卡顿
      const start = Math.max(1, pageNumber - 2);
      const end = Math.min(numPages, pageNumber + 2);
      setVisiblePages(Array.from({ length: end - start + 1 }, (_, i) => start + i));
    }
  }, [pageNumber, showThumbnails, numPages]);

  useEffect(() => setPageNumber(1), [file]);
  useEffect(() => {
    if( pageDiv.current){
     (pageDiv.current.scrollTop = 0)
    }
  }, [pageNumber]);

  const renderContent=()=>(<div className='view'>
    <div className='viewContent' >
      <div className='pageMain' ref={pageDiv}>
        <div className='pageContainer'>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              error={
                <div style={{ textAlign: 'center', width: defaultWidth + 'px' }}>
                  <ExclamationCircleOutlined style={{ fontSize: '150px', color: '#fe725c', margin: '100px' }} />
                </div>
              }
              loading={<div style={{ textAlign: 'center', width: defaultWidth + 'px' }}><Spin size="large" style={{ margin: '200px' }} /></div>}
            >
              {showThumbnails ? (
                <div className='thumbnailContainer'>
                  {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                    <div
                      key={page}
                      className='thumbnail'
                      onClick={() => {
                        setPageNumber(page);
                        setShowThumbnails(false);
                      }}
                    >
                      {visiblePages.includes(page) ? (
                        <Page
                          pageNumber={page}
                          width={150}
                          rotate={rotation}
                          loading={<Spin />}
                          renderTextLayer={false} // 禁用文本层，提升性能
                          renderAnnotationLayer={false} // 禁用注释层
                        />
                      ) : (
                        <div className='thumbnailPlaceholder'>第 {page} 页</div>
                      )}
                      <span>第 {page} 页</span>
                    </div>
                  ))}
                </div>
              ) : (
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  rotate={rotation}
                  loading={<Spin size="large" />}
                  renderTextLayer={false} // 禁用文本层
                  renderAnnotationLayer={false} // 禁用注释层
                  error={() => setPageNumber(1)}
                />
              )}
            </Document>
        </div>
      </div>
      <div className='pageBar'>
        <div className='pageTool'>
          <Tooltip title={pageNumber === 1 ? '已是第一页' : '上一页'}>
            <LeftOutlined onClick={lastPage} />
          </Tooltip>
          <Input
            value={pageNumber}
            onChange={onPageNumberChange}
            onPressEnter={onPageNumberChange as any}
            type="number"
          />{' '}
          / {numPages}
          <Tooltip title={pageNumber === numPages ? '已是最后一页' : '下一页'}>
            <RightOutlined onClick={nextPage} />
          </Tooltip>
          <Tooltip title="放大">
            <PlusCircleOutlined onClick={pageZoomIn} />
          </Tooltip>
          <Tooltip title="缩小">
            <MinusCircleOutlined onClick={pageZoomOut} />
          </Tooltip>
          <Tooltip title="向左旋转">
            <RotateLeftOutlined onClick={rotateLeft} />
          </Tooltip>
          <Tooltip title="向右旋转">
            <RotateRightOutlined onClick={rotateRight} />
          </Tooltip>
          <Tooltip title={showThumbnails ? '关闭缩略图' : '显示缩略图'}>
            <UnorderedListOutlined onClick={toggleThumbnails} />
          </Tooltip>
          <Tooltip title={fullscreen ? '恢复默认' : '适合窗口'}>
            {fullscreen ? <FullscreenExitOutlined onClick={pageFullscreen} /> : <FullscreenOutlined onClick={pageFullscreen} />}
          </Tooltip>
          {onClose && (
            <Tooltip title="关闭">
              <CloseCircleOutlined onClick={onClose} />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  </div>)
  if(parentDom){
    return renderContent()
  }
  return createPortal(
    renderContent(),
    parent,)
};

export default PDFView;
