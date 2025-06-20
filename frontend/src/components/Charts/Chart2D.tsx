import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Bar, Scatter, Pie } from 'react-chartjs-2';
import { ChartConfig } from '../../types';
import { generateChartData, chartOptions } from '../../utils/chartHelpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface Chart2DProps {
  config: ChartConfig;
  data: any[];
}

const Chart2D: React.FC<Chart2DProps> = ({ config, data }) => {
  const chartData = generateChartData(data, config.xAxis, config.yAxis, config.chartType);
  
  const options = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: !!config.title,
        text: config.title,
      },
    },
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        title: {
          display: true,
          text: config.xAxis,
        },
      },
      y: {
        ...chartOptions.scales.y,
        title: {
          display: true,
          text: config.yAxis,
        },
      },
    },
  };

  const renderChart = () => {
    switch (config.chartType) {
      case 'line':
      case 'area':
        return <Line data={chartData} options={options} />;
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'scatter':
        return <Scatter data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
      default:
        return <Line data={chartData} options={options} />;
    }
  };

  return (
    <div className="w-full h-full">
      {renderChart()}
    </div>
  );
};

export default Chart2D;