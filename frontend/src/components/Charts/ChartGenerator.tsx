import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setConfig, generateSuccess } from '../../store/slices/chartSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { ChartConfig } from '../../types';
import { chartTypeOptions } from '../../utils/chartHelpers';
import Chart2D from './Chart2D';
import Chart3D from './Chart3D';

const ChartGenerator: React.FC = () => {
  const dispatch = useDispatch();
  const { currentFile } = useSelector((state: RootState) => state.data);
  const { config } = useSelector((state: RootState) => state.chart);
  
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: '2d',
    chartType: 'line',
    xAxis: '',
    yAxis: '',
    zAxis: '',
    title: '',
    colors: ['#3B82F6', '#8B5CF6', '#10B981'],
  });

  useEffect(() => {
    if (currentFile && currentFile.columns.length > 0) {
      setChartConfig(prev => ({
        ...prev,
        xAxis: currentFile.columns[0],
        yAxis: currentFile.columns[1] || '',
        zAxis: currentFile.columns[2] || '',
      }));
    }
  }, [currentFile]);

  const handleConfigChange = (field: keyof ChartConfig, value: any) => {
    setChartConfig(prev => ({ ...prev, [field]: value }));
  };

  const generateChart = () => {
    if (!currentFile) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please upload a file first'
      }));
      return;
    }

    if (!chartConfig.xAxis || !chartConfig.yAxis) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please select both X and Y axes'
      }));
      return;
    }

    dispatch(setConfig(chartConfig));

    const newChart = {
      id: Date.now().toString(),
      title: chartConfig.title || `${chartConfig.chartType} Chart`,
      type: chartConfig.type,
      chartType: chartConfig.chartType,
      xAxis: chartConfig.xAxis,
      yAxis: chartConfig.yAxis,
      zAxis: chartConfig.zAxis,
      dataId: currentFile.id,
      createdAt: new Date().toISOString(),
      userId: '1',
    };

    dispatch(generateSuccess(newChart));
    dispatch(addNotification({
      type: 'success',
      message: 'Chart generated successfully!'
    }));
  };

  if (!currentFile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Please upload an Excel file first to generate charts.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Configuration Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Chart Configuration
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chart Title
            </label>
            <input
              type="text"
              value={chartConfig.title}
              onChange={(e) => handleConfigChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter chart title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chart Dimension
              </label>
              <select
                value={chartConfig.type}
                onChange={(e) => handleConfigChange('type', e.target.value as '2d' | '3d')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="2d">2D Charts</option>
                <option value="3d">3D Charts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chart Type
              </label>
              <select
                value={chartConfig.chartType}
                onChange={(e) => handleConfigChange('chartType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {chartTypeOptions[chartConfig.type].map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                X-Axis
              </label>
              <select
                value={chartConfig.xAxis}
                onChange={(e) => handleConfigChange('xAxis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select column</option>
                {currentFile.columns.map(column => (
                  <option key={column} value={column}>{column}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Y-Axis
              </label>
              <select
                value={chartConfig.yAxis}
                onChange={(e) => handleConfigChange('yAxis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select column</option>
                {currentFile.columns.map(column => (
                  <option key={column} value={column}>{column}</option>
                ))}
              </select>
            </div>
          </div>

          {chartConfig.type === '3d' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Z-Axis (Optional)
              </label>
              <select
                value={chartConfig.zAxis || ''}
                onChange={(e) => handleConfigChange('zAxis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select column</option>
                {currentFile.columns.map(column => (
                  <option key={column} value={column}>{column}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={generateChart}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Generate Chart
          </button>
        </div>
      </div>

      {/* Chart Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Chart Preview
        </h3>
        
        {config ? (
          <div className="h-96">
            {config.type === '2d' ? (
              <Chart2D config={config} data={currentFile.data} />
            ) : (
              <Chart3D config={config} data={currentFile.data} />
            )}
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Configure your chart settings to see preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartGenerator;