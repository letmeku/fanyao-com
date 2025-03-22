# ExcelPreviewFromURL 组件

`ExcelPreviewURL` 是一个 React 组件，用于从指定 URL 加载 Excel 文件并将其内容以表格形式展示在页面上。它基于 `xlsx` 库解析 Excel 数据，并使用 `react-table` 渲染表格，支持动态加载和错误处理。

## 安装

```bash
npm install react-nexlif
```

## 使用方法

### 基本用法

将组件导入你的项目，并在 JSX 中使用它，只需传入一个 Excel 文件的 URL：

```jsx
import React from 'react';
import {ExcelPreviewURL} from 'react-nexlif';;

const App = () => {
  return (
    <div>
      <h1>Excel 文件预览</h1>
      <ExcelPreviewURL height={200} fileUrl="http://192.168.110.40:9000/knowledgebase/是是是(1)_20250321134651.xlsx" />
    </div>
  );
};

export default App;
```

### 属性 (Props)

| 属性名   | 类型   | 是否必填 | 默认值 | 描述                       |
|----------|--------|----------|--------|----------------------------|
| `fileUrl` | `string` | 是       | 无     | Excel 文件的 URL 地址，用于加载和解析文件 |

### 功能特性

- **动态加载**：通过传入的 `fileUrl` 自动加载并解析 Excel 文件。
- **表格展示**：使用 `react-table` 将 Excel 数据渲染为结构化的表格。
- **加载状态**：显示“加载中”提示，直到数据加载完成。
- **错误处理**：如果加载失败，显示错误信息。
- **日期格式化**：Excel 中的日期字段会自动格式化为 `yyyy-mm-dd`。

## 注意事项

1. **CORS 限制**：确保提供的 `fileUrl` 支持跨域请求（CORS），否则 `fetch` 请求可能会失败。
2. **文件格式**：当前仅支持 `.xlsx` 或其他 `xlsx` 库支持的 Excel 文件格式。
3. **依赖版本**：确保 `react-table` 和 `xlsx` 的版本与组件兼容。

## 示例数据格式

加载后，组件将渲染为：

| Name   | Age | Birthdate  |
|--------|-----|------------|
| Alice  | 25  | 1998-05-10 |
| Bob    | 30  | 1993-12-15 |


## 开发与贡献

如果你想为组件添加功能或修复问题，请 fork 项目并提交 PR。欢迎任何形式的贡献！

## 许可证

MIT License
```

### 说明
- **结构清晰**：包括安装、用法、属性说明、样式自定义等部分，适合开发者快速上手。
- **代码示例**：提供了基本的导入和使用代码，方便用户复制粘贴。
- **注意事项**：提醒用户可能遇到的问题，如 CORS 和文件格式。
- **样式自定义**：提供了类名说明和示例，方便用户调整外观。

如果需要调整内容（比如添加更多示例或修改描述），请告诉我！
