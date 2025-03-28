import React, { useState, useEffect } from 'react';
import { Transfer, Tree, Switch, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import  './index.less';

interface TreeDataNode {
  key: React.Key;
  title: string;
  id?: string;
  description?: string; // 新增描述
  icon?: React.ReactNode; // 新增图标
  isLeaf?: boolean;
  children?: TreeDataNode[];
}

function updateTreeDataSource(treeSource: TreeDataNode[], eventKey: React.Key, newChildren: TreeDataNode[]): boolean {
  return treeSource.some((node, i) => {
    if (node.key === eventKey) {
      treeSource[i] = { ...node, children: newChildren };
      return true;
    }
    if (node.children) {
      return updateTreeDataSource(node.children, eventKey, newChildren);
    }
    return false;
  });
}

interface Props {
  loadDataFetch: (params: { parentId: string }) => Promise<any[]>;
  treeData?: TreeDataNode[];
  type?: number;
  selectedData?: { orgId: string }[];
  isShow?: boolean;
  handleChange?: (data: { list: { orgId: string }[]; type?: number }) => void;
}

 const TransferComTree: React.FC<Props> = ({
  loadDataFetch,
  treeData = [],
  type = 0,
  selectedData = [],
  isShow = false,
  handleChange,
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [treeDataSource, setTreeDataSource] = useState<TreeDataNode[]>(treeData);
  const [checkStrictly, setCheckStrictly] = useState(true);
  const [searchValue, setSearchValue] = useState<string>('');

  const transferDataSource: TreeDataNode[] = [];
  const flatten = (list: TreeDataNode[] = []) => {
    list.forEach(item => {
      transferDataSource.push(item);
      if (item.children) flatten(item.children);
    });
  };
  flatten(treeDataSource);

  const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) => selectedKeys.includes(eventKey);

  const generateTree = (nodes: TreeDataNode[], checkedKeys: string[]): TreeDataNode[] =>
    nodes
      .filter(node => !searchValue || node.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map(node => ({
        ...node,
        disabled: checkedKeys.includes(node.key as string),
        children: node.children ? generateTree(node.children, checkedKeys) : undefined,
      }));

  const loadData = async (treeNode: any) => {
    const children = await loadDataFetch({ parentId: treeNode.id || treeNode.key });
    const newChildren = children.map((i: any) => ({
      key: i.id,
      title: i.name,
      id: i.id,
      description: i.description || `ID: ${i.id}`, // 默认描述
      icon: i.icon || <SearchOutlined />, // 默认图标
      isLeaf: i.leaf,
    }));
    updateTreeDataSource(treeDataSource, treeNode.key, newChildren);
    setTreeDataSource([...treeDataSource]);
  };

  useEffect(() => {
    if (handleChange) {
      handleChange({ list: targetKeys.map(orgId => ({ orgId })), type });
    }
  }, [targetKeys, handleChange, type]);

  useEffect(() => {
    if (selectedData.length) {
      setTargetKeys(selectedData.map(i => i.orgId));
    }
  }, [selectedData]);

  const renderTreeNode = (node: TreeDataNode) => (
    <span>
      {node.icon} {node.title} <small style={{ color: '#888' }}>{node.description}</small>
    </span>
  );

  return (
    <Transfer
      titles={isShow ? ['未授权部门', `已授权部门 (${targetKeys.length})`] : undefined}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      onChange={setTargetKeys}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) =>
        direction === 'left' ? (
          <div>
            <div className="switch">
              <span>只选本级</span>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={checkStrictly}
                onChange={checked => {
                  setTargetKeys([]);
                  setCheckStrictly(checked);
                }}
              />
            </div>
            <div className="search">
              <Input
                placeholder="搜索部门"
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <div className="tree">
              <Tree
                blockNode
                checkable
                checkStrictly={checkStrictly}
                checkedKeys={[...selectedKeys, ...targetKeys]}
                treeData={generateTree(treeDataSource, targetKeys)}
                onCheck={(_, { node }) => onItemSelect(node.key as string, !isChecked([...selectedKeys, ...targetKeys], node.key))}
                onSelect={(_, { node }) => onItemSelect(node.key as string, !isChecked([...selectedKeys, ...targetKeys], node.key))}
                loadData={loadData}
                titleRender={renderTreeNode}
              />
            </div>
          </div>
        ) : null
      }
    </Transfer>
  );
};


export default TransferComTree;
