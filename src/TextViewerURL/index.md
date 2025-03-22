# TextViewerURL 组件使用说明

## 简介

`TextViewerURL` 是一个用于加载和显示远程文本文件内容的 React 组件。它支持多种字符编码（包括 UTF-8、UTF-16、GB18030 和 ISO-8859-1），并能自动检测 BOM（字节顺序标记）以正确解码文件内容。

## 安装

使用 `npm` 或 `yarn` 安装组件：

```sh
npm install react-nexlif
# 或者
yarn add react-nexlif

# 或者
pnpm add react-nexlif
```

## 使用示例

```tsx
import React from 'react';
import {TextViewerURL,utils} from 'react-nexlif';


const App = () => {
  return (
    <div>
      <h1>Excel 文件预览</h1>
      <>{
        utils.browserVersionTest().name
      }</>
      <TextViewerURL height={500} fileUrl="http://192.168.110.40:9000/knowledgebase/1数据分析与挖掘ANSI_20250311140842.txt" />
    </div>
  );
};
export default App;
```

## Props

| 参数     | 类型   | 必填 | 说明                         |
|--------|------|----|----------------------------|
| fileUrl | `string` | 是  | 远程文本文件的 URL 地址 |

## 特性

- **自动编码检测**：支持 UTF-8（含 BOM）、UTF-16 LE/BE（含 BOM）、GB18030、ISO-8859-1 编码。
- **错误处理**：如果文件无法解码，会显示错误信息。
- **异步加载**：文件通过 `fetch` 加载，并在加载过程中显示“加载中...”提示。


## 依赖

该组件基于 `React`，请确保项目已安装 React。

## 许可证

本组件遵循 MIT 许可证。
```

这样，文档涵盖了组件的功能、用法、API、特性和样式信息，符合标准的组件文档格式。你可以根据需要进一步调整或补充。
