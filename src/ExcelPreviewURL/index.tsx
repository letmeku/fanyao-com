import React, { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { useTable } from 'react-table';
import './index.less';


interface ExcelPreviewURLProps {
  fileUrl: string;
  height?: number;
}
type RowData = Record<string, string | number | Date>;
interface Column { Header: string; accessor: string; }

const parseExcelFromUrl = async (url: string): Promise<{ columns: Column[]; data: RowData[] }> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Excel file.');
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false }) as string[][];

  const columns = sheetData[0].map((col, index) => ({ Header: col, accessor: index.toString() }));
  const rowData = sheetData.slice(1).map((row, rowIndex) =>
    row.reduce((acc, curr, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
      const cell = sheet[cellRef];
      acc[colIndex.toString()] = cell?.t === 'd' ? XLSX.SSF.format('yyyy-mm-dd', cell.v) : curr;
      return acc;
    }, {} as RowData)
  );

  return { columns, data: rowData };
};

const ExcelPreviewURL: React.FC<ExcelPreviewURLProps> = ({ fileUrl, height = 500 }) => {
  const [data, setData] = useState<RowData[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileUrl) return;
    setLoading(true);
    parseExcelFromUrl(fileUrl)
      .then(({ columns, data }) => {
        setColumns(columns);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load Excel file.');
        setLoading(false);
      });
  }, [fileUrl]);

  const tableInstance = useTable({
    columns: useMemo(() => columns, [columns]),
    data: useMemo(() => data, [data]),
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  if (loading) return <div className="loading-spinner">加载中，请稍候...</div>;
  if (error) return <div className="error-message">出错啦：{error}</div>;

  return (
    <div className="table-container" style={{height: `${height}px`}}>
      <table {...getTableProps()} className="excel-table">
        <thead>
          {headerGroups.map((headerGroup:any, index: React.Key | null | undefined) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: any,
               index: React.Key | null | undefined) => (
                <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row:any,index:number) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell:any, index: React.Key | null | undefined) => (
                  <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelPreviewURL;
