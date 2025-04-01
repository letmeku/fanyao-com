import { UploadOutlined } from '@ant-design/icons';
import { Button, Collapse, Input, Modal, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { FileItem } from './FileItem';
import './index.less';
import {
  delfileFromOSS,
  getFileType,
  getOSSList,
  uploadToOSS,
  validateFile,
} from './utils';

export interface FileData {
  uid: string;
  fileId: string;
  name: string;
  thumbUrl: string;
  url?: string; // OSS 返回的链接
  status: 'uploading' | 'done' | 'error' | 'syncing';
  percent?: number;
  fileData?: any;
  type: 'image' | 'document' | 'other';
  note?: string;
  uploadTime: number;
  cloudUrl?: string; // 云存储链接
}

export interface Props {
  accept?: string;
  uploadName?: string;
  listType?: 'text' | 'picture';
  maxCount?: number;
  maxBytes?: number;
  multiple?: boolean;
  fileList?: FileData[];
  uploadUrl?: string;
  ossConfig?: {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
  }; // OSS 配置
  showUploadList?: boolean;
  disabled?: boolean;
  extraTip?: React.ReactNode;
  showTips?: boolean;
  onChange?: (list: FileData[]) => void;
  onLoading?: (loading: boolean) => void;
  onSuccess?: (list: FileData[]) => void;
  filedIds?: (ids: string[]) => void;
}
const { Panel } = Collapse;
const { Option } = Select;

const AliUploader = ({
  accept = '.doc,.docx,.xls,.xlsx,.pdf,.pptx,.png,.jpg',
  uploadName = '上传文件',
  listType = 'text',
  maxCount = 1,
  maxBytes = 20,
  multiple = false,
  fileList = [],
  ossConfig,
  showUploadList = true,
  disabled = false,
  extraTip,
  showTips = true,
  onChange,
  onLoading,
  onSuccess,
  filedIds,
}: Props) => {
  const [uploadFileList, setUploadFileList] = useState<FileData[]>(fileList);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'name'>('time');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [batchEditVisible, setBatchEditVisible] = useState(false);
  const [batchNote, setBatchNote] = useState('');

  const handleUpload = async (file: File, fileList: File[]) => {
    validateFile(file, accept, maxBytes);
    const files = multiple && fileList ? fileList : [file];
    if (files.length > maxCount) {
      message.warning(`最多上传${maxCount}个文件`);
      return;
    }

    setLoading(true);
    onLoading?.(true);
    const newFiles = files.map((f: any) => ({
      uid: `${Date.now()}-${Math.random()}`,
      name: f.name,
      thumbUrl: '',
      status: '' as const,
      percent: 0,
      type: 'other' as const,
      uploadTime: Date.now(),
    }));
    const updatedList =
      maxCount === 1 ? newFiles : ([...uploadFileList, ...newFiles] as any);
    setUploadFileList(updatedList);

    try {
      const results = await Promise.all(
        files.map((f: any, i) => {
          uploadToOSS(f, ossConfig!, (result) => {
            setUploadFileList((prev) =>
              prev.map((item) =>
                item.uid === newFiles[i].uid ? { ...item, ...result } : item,
              ),
            );
          });
          return f;
        }),
      );
      const finalList = maxCount === 1 ? results : uploadFileList;
      onChange?.(finalList);
      onSuccess?.(finalList);
      filedIds?.(finalList.map((f) => f.uid));
      message.success(`${results.length}个文件上传成功`);
    } catch (error) {
      setUploadFileList((prev) =>
        prev.map((f) =>
          newFiles.some((n) => n.uid === f.uid) ? { ...f, status: 'error' } : f,
        ),
      );
      message.error('部分文件上传失败');
    } finally {
      setLoading(false);
      onLoading?.(false);
    }
  };

  const handleRemove = (file: FileData) => {
    delfileFromOSS(file.name, ossConfig!, () => {
      const newList = uploadFileList.filter((f) => f.uid !== file.uid);
      setUploadFileList(newList);
      setSelectedFiles((prev) => prev.filter((uid) => uid !== file.uid));
      onChange?.(newList);
      filedIds?.(newList.map((f) => f.uid));
    });
  };

  const handleEdit = (editedFile: FileData) => {
    const newList = uploadFileList.map((f) =>
      f.uid === editedFile.uid ? editedFile : f,
    );
    setUploadFileList(newList);
    onChange?.(newList);
  };

  const handleSelect = (uid: string, selected: boolean) => {
    setSelectedFiles((prev) =>
      selected ? [...prev, uid] : prev.filter((id) => id !== uid),
    );
  };

  const handleBatchEdit = () => {
    if (selectedFiles.length === 0) {
      message.warning('请先选择文件');
      return;
    }
    setBatchEditVisible(true);
  };

  const applyBatchEdit = () => {
    const newList = uploadFileList.map((f) =>
      selectedFiles.includes(f.uid) ? { ...f, note: batchNote } : f,
    );
    setUploadFileList(newList);
    onChange?.(newList);
    setBatchEditVisible(false);
    setSelectedFiles([]);
    setBatchNote('');
  };

  const groupedFiles = {
    image: uploadFileList.filter((f) => f.type === 'image'),
    document: uploadFileList.filter((f) => f.type === 'document'),
    other: uploadFileList.filter((f) => f.type === 'other'),
  };

  const sortFiles = (files: FileData[]) =>
    files.sort((a, b) =>
      sortBy === 'time'
        ? b.uploadTime - a.uploadTime
        : a.name.localeCompare(b.name),
    );

  useEffect(() => {
    getOSSList(ossConfig!, (result) => {
      const arr = result.objects.map((r: any) => ({
        uid: `r.name+${Date.now()}-${Math.random()}`,
        name: r.name,
        thumbUrl: r.url,
        url: r.url,
        status: 'done',
        percent: 100,
        type: getFileType(r.name),
        uploadTime: r.lastModified,
      }));
      setUploadFileList((prev) => [...prev, ...arr]);
    });
  }, []);

  return (
    <div className="fileUpload">
      <Upload.Dragger
        accept={accept}
        listType={listType as any}
        maxCount={maxCount}
        multiple={multiple}
        beforeUpload={handleUpload}
        fileList={[]}
        disabled={disabled || loading}
      >
        <Button icon={<UploadOutlined />} loading={loading} disabled={disabled}>
          {uploadName}
        </Button>
        {showTips && (
          <div className="tip">
            {`支持${maxBytes}MB以内的${accept}文件（可拖拽上传，直接存至 OSS）`}
          </div>
        )}
      </Upload.Dragger>
      {showUploadList && (
        <div>
          <div style={{ margin: '10px 0px' }}>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 120, marginRight: 10 }}
            >
              <Option value="time">按时间排序</Option>
              <Option value="name">按名称排序</Option>
            </Select>
            <Button
              onClick={handleBatchEdit}
              disabled={selectedFiles.length === 0}
            >
              批量编辑 ({selectedFiles.length})
            </Button>
          </div>
          <Collapse defaultActiveKey={['image', 'document', 'other']}>
            {Object.entries(groupedFiles).map(([type, files]) =>
              files.length > 0 ? (
                <Panel
                  header={`${
                    type === 'image'
                      ? '图片'
                      : type === 'document'
                      ? '文档'
                      : '其他'
                  } (${files.length})`}
                  key={type}
                >
                  {sortFiles(files).map((file) => (
                    <FileItem
                      key={file.uid}
                      file={file}
                      onRemove={() => handleRemove(file)}
                      onEdit={handleEdit}
                      onSelect={handleSelect}
                      selected={selectedFiles.includes(file.uid)}
                    />
                  ))}
                </Panel>
              ) : null,
            )}
          </Collapse>
        </div>
      )}
      {extraTip && <div className="extraTip">{extraTip}</div>}
      <Modal
        open={batchEditVisible}
        title={`批量编辑 (${selectedFiles.length} 个文件)`}
        onOk={applyBatchEdit}
        onCancel={() => setBatchEditVisible(false)}
      >
        <Input
          value={batchNote}
          onChange={(e) => setBatchNote(e.target.value)}
          placeholder="输入统一备注"
        />
      </Modal>
    </div>
  );
};

export default AliUploader;
