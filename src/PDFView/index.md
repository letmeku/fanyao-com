# PDFView 组件

## 组件简介

`PDFView` 是一个基于 `react-pdf` 的 PDF 查看组件，支持页面翻页、放大缩小、旋转、全屏模式以及缩略图预览，能够在 Web 页面上方便地浏览 PDF 文件。

## 安装

```sh
npm install fanyao-com
# 或者
yarn add fanyao-com

# 或者
pnpm add fanyao-com
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

### 3. 使用示例 1

```tsx
import { PDFView } from 'fanyao-com';
import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
const App = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fileUrl = 'https://www.gov.cn/zhengce/pdfFile/2023_PDF.pdf'; // 替换为你的 PDF 文件地址
  return (
    <div>
      <button onClick={() => setVisible(true)}>打开 PDF</button>
      {visible && (
        <PDFView
          lazyLoad={false}
          file={fileUrl}
          onClose={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default App;
```

### 3. 使用示例 2(插入的父元素)

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { PDFView } from 'fanyao-com';
import { Button, Modal } from 'antd';
const App: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (ref) {
      // 测试链接
      setFileUrl('https://www.gov.cn/zhengce/pdfFile/2023_PDF.pdf');
    }
  }, []);
  return (
    <div
      ref={ref}
      style={{ position: 'relative', height: '100%', width: '100%' }}
    >
      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <div
        ref={ref}
        style={{
          position: 'relative',
          minHeight: 600,
          width: 650,
          height: '100%',
        }}
      >
        <PDFView
          parentDom={ref.current}
          file={fileUrl}
          width={600}
          lazyLoad={true}
          lazyLoadConfig={{ threshold: 400, pagesPerLoad: 4 }}
          onClose={() => {
            setFileUrl(null);
          }}
        />
      </div>
    </div>
  );
};

export default App;
```

### 属性 (Props)

| 属性名            | 类型                     | 是否必填 | 默认值          | 描述                                                                      |
| ----------------- | ------------------------ | -------- | --------------- | ------------------------------------------------------------------------- |
| `file`            | `string \| null`         | 否       | `null`          | PDF 文件的 URL 或路径。若为空，显示“文件不存在”。                         |
| `parentDom`       | `HTMLDivElement \| null` | 否       | `document.body` | 渲染 PDF 的父容器。若未提供，使用 `createPortal` 渲染到 `document.body`。 |
| `onClose`         | `() => void`             | 否       | 无              | 关闭按钮的回调函数。                                                      |
| `operationConfig` | `Config`                 | 否       | `{}`            | 控制操作栏功能的配置对象（见下表）。                                      |
| `width`           | `number`                 | 否       | `600`           | PDF 页面默认宽度（像素）。                                                |
| `lazyLoad`        | `boolean`                | 否       | `false`         | 是否启用懒加载，优化多页 PDF 性能。                                       |
| `lazyLoadConfig`  | `LazyLoadConfig`         | 否       | `{}`            | 懒加载配置（见下表）。                                                    |

#### `operationConfig` 配置项

| 属性名        | 类型      | 默认值 | 描述                                         |
| ------------- | --------- | ------ | -------------------------------------------- |
| `showPage`    | `boolean` | `true` | 是否显示页面导航（上一页/下一页/页码输入）。 |
| `zoom`        | `boolean` | `true` | 是否显示缩放按钮（放大/缩小）。              |
| `rotate`      | `boolean` | `true` | 是否显示旋转按钮（左旋/右旋）。              |
| `screenScale` | `boolean` | `true` | 是否显示全屏/恢复按钮。                      |
| `thumbnails`  | `boolean` | `true` | 是否显示缩略图切换按钮。                     |
| `close`       | `boolean` | `true` | 是否显示关闭按钮。                           |
| `currentPage` | `number`  | `1`    | 打开 PDF 时定位到页码。                      |

#### `lazyLoadConfig` 配置项

| 属性名         | 类型     | 默认值             | 描述                           |
| -------------- | -------- | ------------------ | ------------------------------ |
| `threshold`    | `number` | 动态（300 或 150） | 触发懒加载的滚动距离（像素）。 |
| `pagesPerLoad` | `number` | 动态（5 或 2）     | 每次懒加载的页面数。           |

### 功能特性

- **页面导航**：支持上一页、下一页、指定页码跳转（输入框或键盘箭头键）。
- **缩放与全屏**：支持放大（Ctrl +）、缩小（Ctrl -）、全屏切换（Ctrl + F）。
- **旋转**：支持页面左旋/右旋（90° 增量）。
- **缩略图预览**：可切换显示缩略图（Ctrl + T），点击缩略图快速跳转。
- **懒加载**：优化多页 PDF 性能，仅加载可见页面附近的内容。
- **键盘导航**：支持快捷键，提升无障碍体验。
- **错误处理**：加载失败时显示友好提示（带图标）。
- **动态渲染**：支持动态调整页面宽度和父容器。
- **无障碍支持**：操作按钮包含 ARIA 属性，支持键盘交互。

## 样式自定义

组件默认样式位于 `index.less`，你可以通过覆盖以下类名自定义外观：

- `.view`：整体容器
- `.pageMain`：PDF 页面区域
- `.pageContainer`：页面内容容器
- `.thumbnailContainer`：缩略图容器
- `.pageBar`：操作栏
- `.pdf-page-container`：单页容器
- `.pdf-page-content`：单页内容

示例自定义样式：

```css
.view {
  background-color: #f5f5f5;
  padding: 20px;
}

.pageMain {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.thumbnailContainer .thumbnail {
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnailContainer .thumbnail:hover {
  border-color: #1890ff;
}

.pageBar {
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## 注意事项

1. **CORS 限制**：确保 `file` 提供的 PDF URL 支持跨域请求（CORS），否则加载可能失败。
2. **依赖版本**：确保 `react-pdf`, `antd`, 和 `lodash` 的版本与组件兼容。
3. **性能优化**：对于大型 PDF（多页），建议启用 `lazyLoad` 并调整 `lazyLoadConfig` 参数。
4. **无障碍支持**：组件已添加 ARIA 属性，确保操作按钮可通过键盘访问（Tab/Enter）。
5. **网络环境**：使用淘宝源可加速国内访问，但发布包需切换到官方源。
6. **浏览器兼容性**：确保浏览器支持 Web Worker（用于 `react-pdf` 的 PDF 解析）。

### 说明

- **完整性**：文档包含安装、使用、属性说明、样式自定义、注意事项等，适合开发者快速上手。
- **淘宝源与错误处理**：整合了设置淘宝源和解决“Public registration is not allowed”的说明，放在安装部分。
- **组件特性**：详细描述了 `PDFView` 的功能（导航、缩放、懒加载等），并通过表格清晰呈现属性。
- **示例代码**：提供了基本用法和高级配置示例，包含父容器和懒加载设置。
- **样式自定义**：列出关键类名并提供示例，方便用户调整外观。

如果需要调整文档内容（比如添加更多示例、精简某部分，或针对特定场景优化），请告诉我！

## 结论

`PDFView` 组件提供了简洁易用的 PDF 浏览功能，适用于各种需要在 Web 页面上查看 PDF 文件的场景。通过多种操作方式（翻页、缩放、旋转、全屏、缩略图等），能够提高用户体验，满足不同需求。

## 开发与贡献

如果你想为组件添加功能或修复问题，请 fork 项目并提交 PR。欢迎任何形式的贡献！

## 许可证

MIT License

```

```
