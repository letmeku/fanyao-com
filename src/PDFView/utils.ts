import { useEffect, useCallback, useState, RefObject, ChangeEvent } from 'react';
import './index.less';
// @ts-ignore
import { pdfjs } from 'react-pdf';
// @ts-ignore
import pdfjsWorker from 'react-pdf/dist/esm/pdf.worker.entry.js';
import { debounce } from 'lodash';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


interface LazyLoadConfig {
  threshold?: number; // 加载阈值（像素）
  pagesPerLoad?: number; // 每次加载的页面数
}


// 自定义 Hook：管理 PDF 状态和逻辑
export const usePDFView = (
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
  const [scrolledPage, setScrolledPage] = useState<number>(1);
  const MAX_VISIBLE_PAGES = 20;

  // 动态加载参数
  const defaultThreshold = navigator.hardwareConcurrency > 4 ? 300 : 150;
  const defaultPagesPerLoad = navigator.hardwareConcurrency > 4 ? 5 : 2;
  const { threshold = defaultThreshold, pagesPerLoad = defaultPagesPerLoad } = lazyLoadConfig;

  // 页面导航
  const lastPage = useCallback((page:number) => {
    if (page > 1) {
      // 如果当前页大于1，则跳转到上一页
      setPageNumber(page - 1)
      setScrolledPage(page - 1)
    }
  }, []);

  const nextPage = useCallback((page:number) => {
    if (page < numPages) {
      setPageNumber(page + 1)
      setScrolledPage(page + 1)
    }
  }, [numPages]);

  const onPageNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Math.min(numPages, Number(e.target.value) || 1));
      setPageNumber(value);
      setScrolledPage(value);
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
            lastPage(scrolledPage);
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextPage(scrolledPage);
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
      const end = Math.min(numPages, pageNumber + pagesPerLoad);
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

 useEffect(() => {
  if (!lazyLoad || showThumbnails || !pageDiv.current) return;

  const handleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = pageDiv.current!;

      // 优化可见页面范围，防止加载过多页面
  const optimizeVisiblePages = (pages: number[]) => {
    const sortedPages = Array.from(new Set(pages)).sort((a, b) => a - b);
    if (sortedPages.length > MAX_VISIBLE_PAGES) {
      const mid = Math.floor((sortedPages[0] + sortedPages[sortedPages.length - 1]) / 2);
      return sortedPages.filter(
        (page) => Math.abs(page - mid) <= Math.floor(MAX_VISIBLE_PAGES / 2)
      );
    }
    return sortedPages;
  };

    // 向下滚动接近底部时加载更多页面
    if (scrollHeight - scrollTop - clientHeight <= threshold) {
      setVisiblePages((prev) => {
        const maxLoadedPage = Math.max(...prev);
        const nextPages = Array.from(
          { length: Math.min(pagesPerLoad, numPages - maxLoadedPage) },
          (_, i) => maxLoadedPage + i + 1
        );
        let newPages = [...prev, ...nextPages];
        return optimizeVisiblePages(newPages);
      });
    }

    // 向上滚动接近顶部时加载前面页面
    if (scrollTop <= threshold) {
      setVisiblePages((prev) => {
        const minLoadedPage = Math.min(...prev);
        const prevPages = Array.from(
          { length: Math.min(pagesPerLoad, minLoadedPage-1 ) },
          (_, i) => minLoadedPage - i - 1
        ).reverse();
        let newPages = [...prevPages, ...prev];
        return optimizeVisiblePages(newPages);
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
     setScrolledPage(1);
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
    scrolledPage,
    setScrolledPage
  };
};
