# react-nexlif

[![NPM version](https://img.shields.io/npm/v/react-nexlif.svg?style=flat)](https://npmjs.org/package/react-nexlif)
[![NPM downloads](http://img.shields.io/npm/dm/react-nexlif.svg?style=flat)](https://npmjs.org/package/react-nexlif)

A react library developed with dumi

### 组件列表

## 1： AliUploader 组件是一个文件上传组件，支持上传到阿里云 OSS，提供批量上传、拖拽上传、文件分类管理、排序、删除、批量编辑等功能。

[查看 AliUploader 文档](http://nexlif.xiaoyaoai.fun/components/ali-uploader)

## 2： `ExcelPreviewURL` 是一个 React 组件，用于从指定 URL 加载 Excel 文件并将其内容以表格形式展示在页面上。它基于 `xlsx` 库解析 Excel 数据，并使用 `react-table` 渲染表格，支持动态加载和错误处理。

[查看 ExcelPreviewURL 文档](http://nexlif.xiaoyaoai.fun/components/excel-preview-url)

## 3： `PDFView` 是一个基于 `react-pdf` 的 PDF 查看组件，支持页面翻页、放大缩小、旋转、全屏模式以及缩略图预览，能够在 Web 页面上方便地浏览 PDF 文件。

[查看 PDFView 文档](http://nexlif.xiaoyaoai.fun/components/pdf-view)

## 4： `TextViewerURL` 是一个用于加载和显示远程文本文件内容的 React 组件。它支持多种字符编码（包括 UTF-8、UTF-16、GB18030 和 ISO-8859-1），并能自动检测 BOM（字节顺序标记）以正确解码文件内容。

[查看 TextViewerURL 文档](http://nexlif.xiaoyaoai.fun/components/text-viewer-url)

## 5： `TransferComSelect` 是一个带有异步加载和搜索功能的树形选择组件，支持层级选择、搜索筛选、懒加载数据，以及外部数据同步。它基于 antd 的 TreeSelect 组件进行了封装，并增强了数据动态加载和用户交互体验。

[查看 TransferComSelect 文档](http://nexlif.xiaoyaoai.fun/components/transfer-com-select)

## 6： `TransferComTree` 是一个基于 `antd` 的 `Transfer` 和 `Tree` 组件的树形穿梭框。它支持以下功能：

[查看 TransferComTree 文档](http://nexlif.xiaoyaoai.fun/components/transfer-com-tree)

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# Locally preview the production build.
$ pnpm run docs:preview

# check your project for potential problems
$ pnpm run doctor

# npm publish
$ npm publish
```

## feat: 新功能开发（feature）

示例: feat(user-group): 添加用户组创建 UI

## fix: 修复 Bug

示例: fix(permission): 修复权限规则列表显示异常

## style: 样式调整，不影响功能

示例: style(ui): 优化用户组列表样式

## refactor: 代码重构，无新功能或 Bug 修复

示例: refactor(api): 重构用户组接口对接逻辑

## docs: 文档变更

示例: docs(readme): 更新用户组功能说明

## test: 添加或修改测试代码

示例: test(user-group): 添加用户组创建单元测试

## chore: 杂项（如工具配置、依赖更新）

示例: chore(deps): 更新前端依赖版本

## LICENSE

MIT
