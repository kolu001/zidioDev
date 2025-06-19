import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { FileSpreadsheet, BarChart3, TrendingUp, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { files } = useSelector((state: RootState) => state.data);
  const { charts } = useSelector((state: RootState) => state.chart);
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    {
      title: 'Files Uploaded',
      value: files.length,
      change: '+12% from last month',
      icon: FileSpreadsheet,
      color: 'blue' as const,
    },
    {
      title: 'Charts Generated',
      value: charts.length,
      change: '+8% from last month',
      icon: BarChart3,
      color: 'green' as const,
    },
    {
      title: 'Data Points',
      value: files.reduce((acc, file) => acc + file.data.length, 0),
      change: '+23% from last month',
      icon: TrendingUp,
      color: 'purple' as const,
    },
    {
      title: 'Active Users',
      value: user?.role === 'admin' ? 24 : 1,
      change: '+5% from last month',
      icon: Users,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to analyze your data and create amazing visualizations?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Upload Excel File</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start by uploading your data</p>
                </div>
              </button>

              <button className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Create Chart</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Generate visualizations</p>
                </div>
              </button>

              <button className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">View Analytics</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Explore your data insights</p>
                </div>
              </button>

              <button className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">AI Insights</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get smart recommendations</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;