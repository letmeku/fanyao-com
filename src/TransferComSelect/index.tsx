import { Empty, Spin, Switch, TreeSelect } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './index.less';

interface TreeDataNode {
  key: string;
  value: string;
  title: string;
  children?: TreeDataNode[];
  isLeaf?: boolean;
}

interface TransferComSelectProps {
  loadDataFetch: (params: { parentId: string }) => Promise<any>;
  treeData?: TreeDataNode[];
  type?: number;
  selectedData?: { id: string }[];
  handleChange?: (data: { selectedIds: string[]; type: number }) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string; // 新增：自定义 placeholder
  switchText?: { onlyThisLevel: string; on: string; off: string }; // 新增：开关文案
  emptyText?: string; // 新增：空状态文案
}

const TransferComSelect: React.FC<TransferComSelectProps> = (props) => {
  const {
    loadDataFetch,
    treeData = [],
    type = 0,
    selectedData = [],
    handleChange,
    className,
    style,
    placeholder = '请输入', // 默认值
    switchText = { onlyThisLevel: '只选本级', on: '开', off: '关' }, // 默认文案
    emptyText = '暂无数据', // 默认空状态文案
  } = props;

  const [sch, setSch] = useState(true);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [treeDataSource, setTreeDataSource] =
    useState<TreeDataNode[]>(treeData);
  const [loading, setLoading] = useState(false);

  // 更新树数据源
  const updateTreeDataSource = (
    data: TreeDataNode[],
    key: string,
    children: TreeDataNode[],
  ) => {
    return data.forEach((node) => {
      if (node.key === key) {
        node.children = children;
      } else if (node.children) {
        updateTreeDataSource(node.children, key, children);
      }
    });
  };

  // 动态加载子节点数据
  const loadData = (treeNode: any) => {
    return new Promise((resolve) => {
      setLoading(true);
      loadDataFetch({ parentId: treeNode.id })
        .then((children: any) => {
          const newChildren = children.map((i: any) => ({
            ...i,
            isLeaf: i?.leaf,
            key: i?.id,
            value: i?.id,
          }));
          updateTreeDataSource(
            treeDataSource,
            treeNode.props.eventKey,
            newChildren,
          );
          setTreeDataSource([...treeDataSource]);
          setLoading(false);
          resolve(treeDataSource);
        })
        .catch(() => setLoading(false));
    });
  };

  // 处理选择变化
  const onChange = (newValue: any[]) => {
    setTargetKeys(newValue.map((i) => i?.value || i));
  };

  // 同步外部传入的已选数据
  useEffect(() => {
    if (selectedData?.length > 0) {
      setTargetKeys(selectedData.map((i) => i?.id));
    }
  }, [selectedData]);

  // 通知父组件选择结果
  useEffect(() => {
    if (handleChange) {
      handleChange({
        selectedIds: targetKeys,
        type,
      });
    }
  }, [targetKeys, handleChange, type]);

  // 新增：防抖搜索函数
  const filterTreeNode = useCallback((inputValue: string, treeNode: any) => {
    return treeNode.title.toLowerCase().includes(inputValue.toLowerCase());
  }, []);

  const { SHOW_ALL } = TreeSelect;
  const tProps = {
    treeData: treeDataSource,
    value: targetKeys,
    onChange,
    treeCheckStrictly: sch,
    treeCheckable: true,
    showCheckedStrategy: SHOW_ALL,
    placeholder,
    loadData,
    showSearch: true,
    filterTreeNode,
    dropdownRender: (node: any) => (
      <>
        <div className="switch">
          <span>{switchText.onlyThisLevel}</span>
          <Switch
            checkedChildren={switchText.on}
            unCheckedChildren={switchText.off}
            checked={sch}
            onChange={(r) => {
              setTargetKeys([]);
              setSch(r);
            }}
          />
        </div>
        <Spin spinning={loading}>
          {treeDataSource.length === 0 && !loading ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={emptyText}
            />
          ) : (
            node
          )}
        </Spin>
      </>
    ),
    className,
    style: { width: '100%', ...style },
  };

  return <TreeSelect {...tProps} />;
};

export default TransferComSelect;
