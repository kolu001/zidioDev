import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

export const chartTypeOptions = {
  '2d': [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'scatter', label: 'Scatter Plot' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'area', label: 'Area Chart' },
  ],
  '3d': [
    { value: 'scatter3d', label: '3D Scatter Plot' },
    { value: 'surface', label: '3D Surface' },
    { value: 'bar3d', label: '3D Bar Chart' },
  ],
};

export const generateChartData = (data: any[], xAxis: string, yAxis: string, chartType: string) => {
  const labels = data.map(item => item[xAxis]);
  const values = data.map(item => item[yAxis]);

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];

  switch (chartType) {
    case 'line':
    case 'area':
      return {
        labels,
        datasets: [{
          label: yAxis,
          data: values,
          borderColor: colors[0],
          backgroundColor: chartType === 'area' ? `${colors[0]}20` : 'transparent',
          fill: chartType === 'area',
          tension: 0.4,
        }],
      };
    case 'bar':
      return {
        labels,
        datasets: [{
          label: yAxis,
          data: values,
          backgroundColor: colors.slice(0, values.length),
          borderColor: colors.slice(0, values.length),
          borderWidth: 1,
        }],
      };
    case 'scatter':
      return {
        datasets: [{
          label: `${xAxis} vs ${yAxis}`,
          data: data.map(item => ({ x: item[xAxis], y: item[yAxis] })),
          backgroundColor: colors[0],
          borderColor: colors[0],
        }],
      };
    case 'pie':
      return {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors.slice(0, values.length),
          borderWidth: 2,
          borderColor: '#ffffff',
        }],
      };
    default:
      return { labels: [], datasets: [] };
  }
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
      },
    },
  },
};