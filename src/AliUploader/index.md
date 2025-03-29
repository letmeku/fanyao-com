# AliUploader 组件使用说明

## 1. 组件介绍

`AliUploader` 是一个基于 `antd` 的 `Transfer` 和 `Tree` 组件的树形穿梭框。它支持以下功能：

- **树形数据结构**：可选择父级和子级数据，支持层级关系。
- **懒加载子节点**：通过 `loadDataFetch` 进行异步加载。
- **可搜索**：内置搜索功能，快速筛选树形节点。
- **支持选中层级模式**：可切换是否严格按照层级选择。

## 安装

使用 `npm` 或 `yarn` 安装组件：

```sh
npm install react-nexlif
# 或者
yarn add react-nexlif

# 或者
pnpm add react-nexlif
```

---

## 2. 使用方式

### 2.1 基本使用示例

```tsx
import React, { useState, useRef } from 'react';
import { AliUploader } from 'react-nexlif';
import { ApartmentOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const uploadRef = useRef(null);

  const ossConfig = {
    region: 'oss-cn-hangzhou',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
  };

  const handleChange = (list: any[]) => {
    console.log('当前文件列表:', list);
  };

  const handleSuccess = (list: any[]) => {
    console.log('上传成功:', list);
    list.forEach((file) =>
      console.log(`文件 ${file.name} 的 OSS 链接: ${file.url}`),
    );
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

---

## 3. 组件 Props 说明

| 参数名          | 类型                                                           | 说明                         | 默认值      |
| --------------- | -------------------------------------------------------------- | ---------------------------- | ----------- |
| `loadDataFetch` | `(params: { parentId: string }) => Promise<any[]>`             | 异步加载子节点数据的请求函数 | 必填        |
| `treeData`      | `TreeDataNode[]`                                               | 初始的树形数据               | `[]`        |
| `type`          | `number`                                                       | 类型标识，可用于业务逻辑     | `0`         |
| `selectedData`  | `{ orgId: string }[]`                                          | 外部传入的默认选中数据       | `[]`        |
| `isShow`        | `boolean`                                                      | 是否显示标题栏               | `false`     |
| `handleChange`  | `(data: { list: { orgId: string }[]; type?: number }) => void` | 选中数据变化时的回调         | `undefined` |

---

## 4. 组件特点

1. **支持懒加载**

   - 通过 `loadDataFetch` 方法，动态获取子节点数据，适用于大数据量的组织结构。

2. **支持层级选择模式**

   - 通过 `Switch` 组件切换，选择是否严格按层级选择。

3. **支持搜索**

   - 通过 `Input` 组件，实现模糊匹配，提高筛选效率。

4. **支持外部传入选中数据**

   - 通过 `selectedData` 传入已有选中项，并能动态更新。

5. **支持节点描述和图标**
   - 通过 `description` 和 `icon` 赋予每个节点更多信息。

---

## 5. 注意事项

- `loadDataFetch` **必须返回符合 `TreeDataNode` 格式的数据**，否则子节点不会正确渲染。
- `selectedData` 需传入 `{ orgId: string }[]` 格式，否则默认值不会正确显示。
- `handleChange` 回调返回的 `list` 格式为 `{ orgId: string }[]`，用于父组件获取选中结果。
- **搜索仅匹配当前已加载的节点**，不会影响未加载的节点。

---

## 6. 适用场景

- **组织架构管理**（如公司部门选择、用户组管理等）
- **权限管理**（如角色授权、资源分配等）
- **分类管理**（如商品分类、目录管理等）

---

这个 `TransferComTree` 组件适用于复杂的树形选择场景，支持大数据优化，易于扩展和二次开发！ 🚀

## 许可证

本组件遵循 MIT 许可证。
