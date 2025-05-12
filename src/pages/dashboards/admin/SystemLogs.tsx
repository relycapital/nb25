import { useState } from 'react';
import { Search, Filter, Download, AlertCircle, Clock, User, Server, Database, Shield } from 'lucide-react';

interface SystemLog {
  id: string;
  event_type: string;
  details: {
    message: string;
    user?: {
      id: string;
      email: string;
    };
    metadata?: Record<string, any>;
  };
  user_id?: string;
  timestamp: string;
}

const SystemLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data
  const logs: SystemLog[] = [
    {
      id: '1',
      event_type: 'auth',
      details: {
        message: 'Failed login attempt',
        user: {
          id: 'user123',
          email: 'user@example.com'
        },
        metadata: {
          ip: '192.168.1.1',
          userAgent: 'Mozilla/5.0'
        }
      },
      timestamp: '2025-03-15T14:30:00Z'
    },
    {
      id: '2',
      event_type: 'storage',
      details: {
        message: 'Storage quota exceeded',
        user: {
          id: 'user456',
          email: 'company@example.com'
        },
        metadata: {
          quota: '500GB',
          used: '512GB'
        }
      },
      timestamp: '2025-03-15T13:45:00Z'
    },
    {
      id: '3',
      event_type: 'system',
      details: {
        message: 'Database backup completed',
        metadata: {
          size: '2.5GB',
          duration: '45s'
        }
      },
      timestamp: '2025-03-15T12:00:00Z'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'auth':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'storage':
        return <Database className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Server className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEventSeverityColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.details.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.event_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !eventTypeFilter || log.event_type === eventTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
          <p className="mt-1 text-gray-500">Monitor and track system events</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">Errors</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">12</h3>
          <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">Warnings</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">45</h3>
          <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">User Events</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">156</h3>
          <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Server className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">System Events</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">89</h3>
          <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEventTypeFilter(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                !eventTypeFilter ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setEventTypeFilter('auth')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                eventTypeFilter === 'auth' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Auth
            </button>
            <button
              onClick={() => setEventTypeFilter('storage')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                eventTypeFilter === 'storage' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Storage
            </button>
            <button
              onClick={() => setEventTypeFilter('system')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                eventTypeFilter === 'system' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              System
            </button>
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-black focus:border-black"
          >
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getEventTypeIcon(log.event_type)}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {log.event_type.charAt(0).toUpperCase() + log.event_type.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{log.details.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.details.user ? (
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{log.details.user.email}</div>
                        <div className="text-gray-500">{log.details.user.id}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">System</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.details.metadata && (
                      <pre className="text-xs bg-gray-50 p-2 rounded">
                        {JSON.stringify(log.details.metadata, null, 2)}
                      </pre>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;