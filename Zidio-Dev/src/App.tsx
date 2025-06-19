import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { uploadSuccess } from './store/slices/dataSlice';
import { generateSuccess } from './store/slices/chartSlice';
import { restoreSession } from './store/slices/authSlice';
import { mockExcelData, mockCharts } from './utils/mockData';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analyze from './pages/Analyze';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { activeTab } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Try to restore user session on app start
    dispatch(restoreSession());
    
    // Load mock data on app start (only if no real data exists)
    const existingData = localStorage.getItem('excelData');
    if (!existingData) {
      mockExcelData.forEach(data => dispatch(uploadSuccess(data)));
      mockCharts.forEach(chart => dispatch(generateSuccess(chart)));
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'analyze':
        return <Analyze />;
      case 'charts':
        return <Analyze />;
      case 'insights':
        return <Dashboard />; // Placeholder
      case 'history':
        return <Upload />; // Placeholder
      case 'users':
        return <Dashboard />; // Placeholder
      case 'settings':
        return <Dashboard />; // Placeholder
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderActiveTab()}
    </Layout>
  );
}

export default App;