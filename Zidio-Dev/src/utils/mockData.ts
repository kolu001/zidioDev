import { User, ExcelData, Chart, AIInsight } from '../types';

// Remove mock users since we now have real sign-up functionality
export const mockUsers: User[] = [];

export const mockExcelData: ExcelData[] = [
  {
    id: '1',
    fileName: 'sales_data_2024.xlsx',
    uploadDate: '2024-01-20',
    columns: ['Month', 'Revenue', 'Units Sold', 'Region', 'Product Category'],
    data: [
      { Month: 'Jan', Revenue: 50000, 'Units Sold': 120, Region: 'North', 'Product Category': 'Electronics' },
      { Month: 'Feb', Revenue: 65000, 'Units Sold': 150, Region: 'South', 'Product Category': 'Electronics' },
      { Month: 'Mar', Revenue: 72000, 'Units Sold': 180, Region: 'East', 'Product Category': 'Clothing' },
      { Month: 'Apr', Revenue: 68000, 'Units Sold': 165, Region: 'West', 'Product Category': 'Electronics' },
      { Month: 'May', Revenue: 78000, 'Units Sold': 200, Region: 'North', 'Product Category': 'Home & Garden' },
      { Month: 'Jun', Revenue: 85000, 'Units Sold': 220, Region: 'South', 'Product Category': 'Electronics' },
    ],
    userId: '1',
  },
  {
    id: '2',
    fileName: 'customer_analytics.xlsx',
    uploadDate: '2024-01-18',
    columns: ['Customer ID', 'Age', 'Purchase Amount', 'Satisfaction Score', 'City'],
    data: [
      { 'Customer ID': 'C001', Age: 25, 'Purchase Amount': 150, 'Satisfaction Score': 4.5, City: 'New York' },
      { 'Customer ID': 'C002', Age: 32, 'Purchase Amount': 280, 'Satisfaction Score': 4.2, City: 'Los Angeles' },
      { 'Customer ID': 'C003', Age: 28, 'Purchase Amount': 320, 'Satisfaction Score': 4.8, City: 'Chicago' },
      { 'Customer ID': 'C004', Age: 45, 'Purchase Amount': 190, 'Satisfaction Score': 3.9, City: 'Houston' },
      { 'Customer ID': 'C005', Age: 38, 'Purchase Amount': 420, 'Satisfaction Score': 4.6, City: 'Phoenix' },
    ],
    userId: '1',
  },
];

export const mockCharts: Chart[] = [
  {
    id: '1',
    title: 'Monthly Revenue Trend',
    type: '2d',
    chartType: 'line',
    xAxis: 'Month',
    yAxis: 'Revenue',
    dataId: '1',
    createdAt: '2024-01-20',
    userId: '1',
  },
  {
    id: '2',
    title: 'Customer Age vs Purchase Amount',
    type: '3d',
    chartType: 'scatter3d',
    xAxis: 'Age',
    yAxis: 'Purchase Amount',
    zAxis: 'Satisfaction Score',
    dataId: '2',
    createdAt: '2024-01-19',
    userId: '1',
  },
];

export const mockInsights: AIInsight[] = [
  {
    id: '1',
    dataId: '1',
    insights: [
      'Revenue shows an upward trend with 70% growth from Jan to Jun',
      'Electronics category dominates sales across all regions',
      'North and South regions show the highest performance',
    ],
    summary: 'Your sales data indicates strong growth with electronics leading the market.',
    recommendations: [
      'Focus marketing efforts on North and South regions',
      'Expand electronics inventory for Q3',
      'Consider seasonal promotions in slower months',
    ],
    createdAt: '2024-01-20',
  },
];