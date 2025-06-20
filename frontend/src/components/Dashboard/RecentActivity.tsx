import React from 'react';
import { FileSpreadsheet, BarChart3, Brain, Download } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: '1',
      type: 'upload',
      description: 'Uploaded sales_data_2024.xlsx',
      time: '2 hours ago',
      icon: FileSpreadsheet,
      color: 'text-blue-500',
    },
    {
      id: '2',
      type: 'chart',
      description: 'Generated Monthly Revenue Chart',
      time: '4 hours ago',
      icon: BarChart3,
      color: 'text-green-500',
    },
    {
      id: '3',
      type: 'insight',
      description: 'AI analysis completed for customer data',
      time: '1 day ago',
      icon: Brain,
      color: 'text-purple-500',
    },
    {
      id: '4',
      type: 'download',
      description: 'Downloaded Sales Performance Report',
      time: '2 days ago',
      icon: Download,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;