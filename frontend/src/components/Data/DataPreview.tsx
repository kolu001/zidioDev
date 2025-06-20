import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FileSpreadsheet, Download, Eye } from 'lucide-react';

const DataPreview: React.FC = () => {
  const { currentFile } = useSelector((state: RootState) => state.data);

  if (!currentFile) {
    return (
      <div className="text-center py-12">
        <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          No data file selected. Upload an Excel file to preview data.
        </p>
      </div>
    );
  }

  const previewData = currentFile.data.slice(0, 10); // Show first 10 rows

  return (
    <div className="space-y-6">
      {/* File Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentFile.fileName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Uploaded on {currentFile.uploadDate} • {currentFile.data.length} rows • {currentFile.columns.length} columns
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Column Summary */}
        <div className="flex flex-wrap gap-2 mb-6">
          {currentFile.columns.map((column, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
            >
              {column}
            </span>
          ))}
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                {currentFile.columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {currentFile.columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
                    >
                      {row[column]?.toString() || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentFile.data.length > 10 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing 10 of {currentFile.data.length} rows
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPreview;