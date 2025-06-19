import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import FileUpload from '../components/Upload/FileUpload';
import DataPreview from '../components/Data/DataPreview';

const Upload: React.FC = () => {
  const { files, currentFile } = useSelector((state: RootState) => state.data);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Data</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Upload Excel files to start analyzing your data
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Upload Files
          </h2>
          <FileUpload />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Data Preview
          </h2>
          <DataPreview />
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Uploaded Files ({files.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentFile?.id === file.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">XL</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {file.fileName}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {file.data.length} rows • {file.columns.length} columns
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {file.uploadDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;