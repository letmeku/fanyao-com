import { DeleteOutlined, PaperClipOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { Image, Progress, Modal, Input, Checkbox, Space } from 'antd';
import './index.less';
import { useState } from 'react';
import React from 'react';
import { FileData } from './interface';

interface FileItemProps {
  file: FileData;
  onRemove: () => void;
  onEdit: (file: FileData) => void;
  onSelect: (uid: string, selected: boolean) => void;
  selected: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onRemove, onEdit, onSelect, selected }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [name, setName] = useState(file.name);
  const [note, setNote] = useState(file.note || '');
  const isImage = file.type === 'image';

  const handleSave = () => {
    onEdit({ ...file, name, note });
    setEditVisible(false);
  };

  return (
    <Space className={isImage ? 'imageList' : 'fileList'}>
      <Checkbox checked={selected} onChange={e => onSelect(file.uid, e.target.checked)} />
      <span onClick={() => setPreviewVisible(true)} style={{ cursor: 'pointer', flex: 1 }}>
        {isImage ? <Image src={file.thumbUrl} width={48} /> : <PaperClipOutlined />}
        <span className='fileName' title={file.name}>
          {file.name} {file.note && <small>({file.note})</small>}
          {file.cloudUrl && <small style={{ color: '#52c41a' }}> (已同步云端)</small>}
        </span>
      </span>
      {file.status === 'uploading' && <Progress percent={file.percent} size="small" />}
      <Space>
        <EyeOutlined className='previewBtn' onClick={() => setPreviewVisible(true)} />
        <EditOutlined className='editBtn' onClick={() => setEditVisible(true)} />
        <DeleteOutlined className='deleteBtn' onClick={onRemove} />
      </Space>
      <Modal
        open={previewVisible}
        title={file.name}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        {isImage ? (
          <Image src={file.url} style={{ width: '100%' }} />
        ) : (
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            点击下载查看
          </a>
        )}
      </Modal>
      <Modal
        open={editVisible}
        title="编辑文件信息"
        onOk={handleSave}
        onCancel={() => setEditVisible(false)}
      >
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="文件名称"
          style={{ marginBottom: '10px' }}
        />
        <Input
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="添加备注"
        />
      </Modal>
    </Space>
  );
};
