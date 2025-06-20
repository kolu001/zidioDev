import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  BarChart3, 
  Database, 
  FileSpreadsheet, 
  Home, 
  Settings, 
  TrendingUp, 
  Users,
  Brain
} from 'lucide-react';
import { RootState } from '../../store';
import { setActiveTab } from '../../store/slices/uiSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, activeTab } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Data', icon: FileSpreadsheet },
    { id: 'analyze', label: 'Analyze', icon: BarChart3 },
    { id: 'charts', label: 'Charts', icon: TrendingUp },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'history', label: 'History', icon: Database },
  ];

  const adminItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-gradient-to-b from-blue-900 to-purple-900 text-white transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } min-h-screen shadow-xl`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="text-lg font-bold">Analytics</h2>
              <p className="text-blue-200 text-sm">Excel Platform</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => dispatch(setActiveTab(item.id))}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'hover:bg-white hover:bg-opacity-10 text-blue-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {user?.role === 'admin' && (
          <>
            <div className="px-4 mt-8 mb-4">
              {sidebarOpen && (
                <h3 className="text-xs uppercase text-blue-300 font-semibold tracking-wider">
                  Admin
                </h3>
              )}
            </div>
            <ul className="space-y-2 px-4">
              {adminItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => dispatch(setActiveTab(item.id))}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-white bg-opacity-20 text-white shadow-lg'
                          : 'hover:bg-white hover:bg-opacity-10 text-blue-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;