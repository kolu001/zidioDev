import React from 'react';
import ChartGenerator from '../components/Charts/ChartGenerator';

const Analyze: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analyze Data</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create interactive charts and visualizations from your data
          </p>
        </div>
      </div>

      <ChartGenerator />
    </div>
  );
};

export default Analyze;