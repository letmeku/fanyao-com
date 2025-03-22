import { useState, useEffect, useCallback } from "react";
import React from "react";
import  './index.less';

interface TextViewerProps {
  fileUrl: string;
}

const hasUTF8BOM = (byteArray: Uint8Array) => byteArray[0] === 0xEF && byteArray[1] === 0xBB && byteArray[2] === 0xBF;
const hasUTF16LEBOM = (byteArray: Uint8Array) => byteArray[0] === 0xFF && byteArray[1] === 0xFE;
const hasUTF16BEBOM = (byteArray: Uint8Array) => byteArray[0] === 0xFE && byteArray[1] === 0xFF;

const TextViewerURL: React.FC<TextViewerProps> = ({ fileUrl }) => {
  const [textContent, setTextContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const decodeTextBuffer = useCallback((buffer: ArrayBuffer) => {
    const byteArray = new Uint8Array(buffer);
    const encodings = [
      { check: hasUTF8BOM, encoding: 'utf-8' },
      { check: hasUTF16LEBOM, encoding: 'utf-16le' },
      { check: hasUTF16BEBOM, encoding: 'utf-16be' },
    ];

    const matched = encodings.find(({ check }) => check(byteArray));
    if (matched) {
      try {
        const decoder = new TextDecoder(matched.encoding, { fatal: true });
        setTextContent(decoder.decode(buffer));
        setIsLoading(false);
      } catch (err) {
        setError(`解码失败：${(err as Error).message}`);
        setIsLoading(false);
      }
      return;
    }

    const fallbackEncodings = ['utf-8', 'gb18030', 'iso-8859-1'];
    for (const encoding of fallbackEncodings) {
      try {
        const decoder = new TextDecoder(encoding, { fatal: true });
        setTextContent(decoder.decode(buffer));
        setIsLoading(false);
        return;
      } catch { }
    }
    setError('无法解码该文件');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!fileUrl) return;
    setIsLoading(true);
    fetch(fileUrl)
      .then(response => {
        if (!response.ok) throw new Error('文件加载失败');
        return response.arrayBuffer();
      })
      .then(decodeTextBuffer)
      .catch(err => {
        setError(err.message === 'Failed to fetch' ? '无法获取文件，请检查 URL 或网络连接' : `发生错误：${err.message}`);
        setIsLoading(false);
      });
  }, [fileUrl, decodeTextBuffer]);

  if (isLoading) return <div className="viewerContainer loading"><span>加载中...</span></div>;
  if (error) return <div className="viewerContainer error" ><span>{error}</span></div>;

  return (
    <div className="viewerContainer">
      <div className="viewerContent">
        <pre>{textContent}</pre>
      </div>
    </div>
  );
};

export default TextViewerURL;
