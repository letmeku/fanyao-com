# PDFView 组件

## 组件简介

`PDFView` 是一个基于 `react-pdf` 的 PDF 查看组件，支持页面翻页、放大缩小、旋转、全屏模式以及缩略图预览，能够在 Web 页面上方便地浏览 PDF 文件。

## 安装

```sh
npm install react-nexlif
# 或者
yarn add react-nexlif

# 或者
pnpm add react-nexlif
```


## 功能特点

- **支持 PDF 文件查看**
- **支持分页浏览**
- **支持缩放（放大/缩小）**
- **支持旋转（向左/向右 90°）**
- **支持全屏查看**
- **支持缩略图预览**
- **支持动态加载页面，提高性能**
- **支持错误提示与加载状态**

### 3. 使用示例1

```tsx
import { PDFView } from 'react-nexlif';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [visible, setVisible] = useState(false);
  const fileUrl = "https://example.com/sample.pdf"; // 替换为你的 PDF 文件地址
 const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div >
      <button onClick={() => setVisible(true)}>打开 PDF</button>
       <Modal width={1100}  title="pdf预览组件" open={visible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ position: 'relative', height: '100vh',width: '100%' }}>
     <PDFView
          file={fileUrl}
          onClose={() => setVisible(false)}
        />
        </div>
      </Modal>
    </div>
  );
};

export default App;
```

### 3. 使用示例2

```tsx
import React, { useState } from 'react';
import { PDFView } from 'react-nexlif';
import { Button, Modal } from 'antd';
const App: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file))
      showModal();
    };
  };
 const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div style={{ position: 'relative', height: '100%',width: '100%' }}>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
        <Modal width={1100} title="pdf预览组件" open={visible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ position: 'relative', height: '100vh',width: '100%'}}>
        <PDFView
          file={fileUrl}
          onClose={() => setVisible(false)}
        />
        </div>
      </Modal>
    </div>
  );
};

export default App;
```

## 组件属性

| 属性名       | 类型                  | 默认值  | 说明 |
|-------------|----------------------|--------|----------------------------------|
| `file`      | `string \| null`      | `null` | 要加载的 PDF 文件地址 |
| `parentDom` | `HTMLDivElement \| null` | `document.body` | 组件渲染的父容器，默认渲染到 `body` |
| `onClose`   | `() => void`          | `undefined` | 关闭组件的回调函数 |

## 组件功能说明

### 1. **页面翻页**

- 使用 `<`（上一页）和 `>`（下一页）按钮进行翻页。
- 可以输入页码并回车跳转到指定页。

### 2. **缩放**

- 点击 `+` 放大 PDF 页面。
- 点击 `-` 缩小 PDF 页面。

### 3. **旋转**

- 点击 `↺` 向左旋转 90°。
- 点击 `↻` 向右旋转 90°。

### 4. **全屏模式**

- 点击 `⛶` 使 PDF 页面适应窗口大小。
- 点击 `⛶` 退出全屏，恢复默认大小。

### 5. **缩略图预览**

- 点击 `📄` 显示所有页面的缩略图。
- 点击缩略图可快速跳转到对应页。

### 6. **错误提示 & 加载状态**

- 如果文件加载失败，会显示错误提示。
- 页面加载过程中会显示 `Spin` 加载动画。

## 结论

`PDFView` 组件提供了简洁易用的 PDF 浏览功能，适用于各种需要在 Web 页面上查看 PDF 文件的场景。通过多种操作方式（翻页、缩放、旋转、全屏、缩略图等），能够提高用户体验，满足不同需求。

## 开发与贡献

如果你想为组件添加功能或修复问题，请 fork 项目并提交 PR。欢迎任何形式的贡献！

## 许可证

MIT License

```
