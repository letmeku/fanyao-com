# AliUploader 组件使用说明

## 1. 组件介绍

AliUploader 组件是一个文件上传组件，支持上传到阿里云 OSS，提供批量上传、拖拽上传、文件分类管理、排序、删除、批量编辑等功能。

## 功能特点

- **支持多种文件类型**（图片、文档、其他）
- **支持拖拽上传**
- **上传进度显示**
- **文件列表管理**（分组、排序、删除、编辑）
- **批量上传和批量编辑**
- **上传前文件校验**（文件类型、大小限制）
- **文件自动同步 OSS**

## 安装

使用 `npm` 或 `yarn` 安装组件：

```sh
npm install react-nexlif
# 或者
yarn add react-nexlif

# 或者
pnpm install react-nexlif
```

---

## 2. 使用方式

### 2.1 基本使用示例

```tsx
import React, { useState, useRef } from 'react';
import { AliUploader } from 'react-nexlif';
import { ApartmentOutlined } from '@ant-design/icons';
// import {ossConfig} from './utils';

const App: React.FC = () => {
  const uploadRef = useRef(null);

  const ossConfig = {
    region: 'oss-cn-hangzhou',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
  };

  const handleChange = (list: any[]) => {
    // console.log('当前文件列表:', list);
  };

  const handleSuccess = (list: any[]) => {
    // console.log('上传成功:', list);
    list.forEach((file) => {
      // console.log(`文件 ${file.name} 的 OSS 链接: ${file.url}`),
    });
  };

  const handleIds = (ids: string[]) => {
    console.log('文件ID:', ids);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>项目文件上传器（OSS 版）</h2>
      <AliUploader
        accept=".doc,.docx,.pdf,.png,.jpg"
        uploadName="上传项目文件到 OSS"
        maxCount={5}
        maxBytes={10}
        multiple={true}
        listType="picture"
        showUploadList={true}
        ossConfig={ossConfig}
        onChange={handleChange}
        onSuccess={handleSuccess}
        filedIds={handleIds}
        extraTip={
          <p style={{ color: '#999' }}>
            支持拖拽批量上传，直接存至 OSS，最多5个文件
          </p>
        }
      />
    </div>
  );
};

export default App;
```

## 组件属性

| 属性名         | 类型      | 默认值 | 说明 |
|--------------|---------|------|--------------------------------------|
| `accept`      | `string` | `.doc,.docx,.xls,.xlsx,.pdf,.pptx,.png,.jpg` | 允许上传的文件类型 |
| `uploadName`  | `string` | `上传文件` | 按钮名称 |
| `listType`    | `'text' \| 'picture'` | `text` | 显示文件列表的样式 |
| `maxCount`    | `number` | `1` | 允许上传的最大文件数 |
| `maxBytes`    | `number` | `20` | 允许的最大文件大小（单位：MB） |
| `multiple`    | `boolean` | `false` | 是否支持多文件上传 |
| `fileList`    | `FileData[]` | `[]` | 默认文件列表 |
| `uploadUrl`   | `string` | `undefined` | 上传地址（未使用 OSS 时） |
| `ossConfig`   | `object` | `undefined` | OSS 配置（region, accessKeyId, accessKeySecret, bucket） |
| `showUploadList` | `boolean` | `true` | 是否显示文件列表 |
| `disabled`    | `boolean` | `false` | 是否禁用上传 |
| `extraTip`    | `ReactNode` | `undefined` | 额外提示信息 |
| `showTips`    | `boolean` | `true` | 是否显示上传提示 |
| `onChange`    | `(list: FileData[]) => void` | `undefined` | 文件列表变化时触发 |
| `onLoading`   | `(loading: boolean) => void` | `undefined` | 上传状态变化时触发 |
| `onSuccess`   | `(list: FileData[]) => void` | `undefined` | 上传成功时触发 |
| `filedIds`    | `(ids: string[]) => void` | `undefined` | 返回上传的文件 ID |

## 组件方法

- `handleUpload(file: File, fileList: File[])` - 处理文件上传逻辑。
- `handleRemove(file: FileData)` - 删除文件。
- `handleEdit(editedFile: FileData)` - 编辑文件信息。
- `handleSelect(uid: string, selected: boolean)` - 选择文件进行批量操作。
- `handleBatchEdit()` - 处理批量编辑。
- `applyBatchEdit()` - 应用批量编辑结果。

## 注意事项

- **OSS 配置**：确保传入正确的阿里云 OSS 配置，否则上传失败。
- **文件校验**：组件内置文件类型和大小校验，如超出限制会有提示。
- **排序功能**：支持按文件名称或上传时间排序。
- **批量操作**：支持批量编辑文件备注信息。

## 结论

AliUploader 组件提供了强大的文件上传能力，适用于需要集成阿里云 OSS 进行文件管理的前端应用。可以方便地处理单个或多个文件上传，并对文件进行管理、分类、编辑等操作。

## 许可证

本组件遵循 MIT 许可证。
