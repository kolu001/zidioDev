export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
}

export interface ExcelData {
  id: string;
  fileName: string;
  uploadDate: string;
  columns: string[];
  data: Record<string, any>[];
  userId: string;
}

export interface Chart {
  id: string;
  title: string;
  type: '2d' | '3d';
  chartType: 'line' | 'bar' | 'scatter' | 'pie' | 'area' | 'surface' | 'scatter3d';
  xAxis: string;
  yAxis: string;
  zAxis?: string;
  dataId: string;
  createdAt: string;
  userId: string;
}

export interface ChartConfig {
  type: '2d' | '3d';
  chartType: string;
  xAxis: string;
  yAxis: string;
  zAxis?: string;
  title: string;
  colors: string[];
}

export interface AIInsight {
  id: string;
  dataId: string;
  insights: string[];
  summary: string;
  recommendations: string[];
  createdAt: string;
}