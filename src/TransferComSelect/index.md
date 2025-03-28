# TransferComSelect 组件使用说明

## 简介

`TransferComSelect` 是一个带有异步加载和搜索功能的树形选择组件，支持层级选择、搜索筛选、懒加载数据，以及外部数据同步。它基于 antd 的 TreeSelect 组件进行了封装，并增强了数据动态加载和用户交互体验。

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
import {TransferComSelect} from 'react-nexlif';

const App: React.FC = () => {
  const initialTreeData = [
    { key: '1', value: '1', title: 'Department A',id:'1' },
    { key: '2', value: '2', title: 'Department B',id:'2' },
  ];

  const fetchData = ({ parentId }: { parentId: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: `${parentId}-1`, title: `Sub ${parentId}-1`, leaf: true },
          { id: `${parentId}-2`, title: `Sub ${parentId}-2`, leaf: true },
        ]);
      }, 1000);
    });
  };

  const handleChange = (data: { list: { orgId: string }[]; type: number }) => {
    console.log('Selected:', data);
  };

  return (
      <div>
      <h1>TransferComSelect   预览</h1>
    <TransferComSelect
      treeData={initialTreeData}
      loadDataFetch={fetchData}
      type={0}
      selectedData={[{ id: '1' }]}
      handleChange={handleChange}
      classtitle="custom-tree-select"
      style={{ border: '1px solid #1890ff', borderRadius: 4 }}
      placeholder="Please input" // 自定义 placeholder
      switchText={{ onlyThisLevel: 'Only this level', on: 'On', off: 'Off' }} // 英文文案
      emptyText="No data available" // 自定义空状态文案
    />
        </div>
  );
};

export default App;
```

## 3. 组件 Props 说明  

| 参数名          | 类型                                      | 说明                                       | 默认值 |
|---------------|---------------------------------|--------------------------------|------|
| `loadDataFetch` | `(params: { parentId: string }) => Promise<any>` | 异步加载子节点数据的请求函数 | 必填 |
| `treeData`      | `TreeDataNode[]` | 初始的树形数据 | `[]` |
| `type`          | `number` | 类型标识，可用于业务逻辑 | `0` |
| `selectedData`  | `{ orgId: string }[]` | 外部传入的默认选中数据 | `[]` |
| `handleChange`  | `(data: { list: { orgId: string }[]; type: number }) => void` | 选中数据变化时的回调 | `undefined` |
| `classtitle`     | `string` | 自定义 class | `undefined` |
| `style`         | `React.CSSProperties` | 自定义样式 | `{}` |
| `placeholder`   | `string` | 选择框的占位符 | `"请输入"` |
| `switchText`    | `{ onlyThisLevel: string; on: string; off: string }` | 级别选择开关的文案 | `{ onlyThisLevel: '只选本级', on: '开', off: '关' }` |
| `emptyText`     | `string` | 无数据时的提示文案 | `"暂无数据"` |

---

## 4. 组件特点  

1. **支持懒加载**：  
   - 通过 `loadDataFetch` 方法，动态获取子节点数据，提升大数据量下的渲染性能。

2. **支持层级选择**：  
   - 通过 `Switch` 控制是否严格层级选择。

3. **支持搜索**：  
   - 采用 `lodash.debounce` 实现防抖搜索，提高性能。

4. **支持外部传入选中数据**：  
   - 通过 `selectedData` 传入已有选中项，并能同步更新。

5. **空数据占位符**：  
   - 通过 `emptyText` 设置无数据时的显示文案。

---

## 5. 注意事项  

- `loadDataFetch` **必须返回符合 `TreeDataNode` 格式的数据**，否则子节点不会正确渲染。  
- `selectedData` 需传入 `{ orgId: string }[]` 格式，否则默认值不会正确显示。  
- `handleChange` 回调返回的 `list` 格式为 `{ orgId: string }[]`，用于父组件获取选中结果。  

---

## 6. 适用场景  

- 组织架构选择（如公司部门、项目团队等）  
- 树形结构数据选择（如分类管理、权限分配等）  
- 需要异步加载数据的层级选择器  

## 许可证

本组件遵循 MIT 许可证。

```
