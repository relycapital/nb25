import {
  BarChart3,
  Users,
  Film,
  Clock,
  DollarSign,
  HardDrive,
  Upload,
  AlertCircle
} from 'lucide-react';

const Overview = () => {
  // Sample data for stats
  const stats = [
    { name: 'Active Projects', value: '12', icon: <Film className="h-6 w-6 text-blue-600" />, change: '+2', trend: 'increase' },
    { name: 'Projects Awaiting Estimate', value: '5', icon: <Clock className="h-6 w-6 text-yellow-600" />, change: '-1', trend: 'decrease' },
    { name: 'Completed Projects', value: '34', icon: <BarChart3 className="h-6 w-6 text-green-600" />, change: '+8', trend: 'increase' },
    { name: 'Monthly Revenue', value: '$24,500', icon: <DollarSign className="h-6 w-6 text-purple-600" />, change: '+12%', trend: 'increase' },
    { name: 'Total Storage', value: '248.6 GB', icon: <HardDrive className="h-6 w-6 text-gray-600" />, change: '+5.2 GB', trend: 'increase' },
    { name: 'Bandwidth Used', value: '84.3 GB', icon: <Upload className="h-6 w-6 text-indigo-600" />, change: '+12.4 GB', trend: 'increase' },
    { name: 'Active Customers', value: '28', icon: <Users className="h-6 w-6 text-red-600" />, change: '+4', trend: 'increase' },
    { name: 'Support Tickets', value: '3', icon: <AlertCircle className="h-6 w-6 text-orange-600" />, change: '-2', trend: 'decrease' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-gray-500">
          Monitor and manage all aspects of your production platform.
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-sm ${
                stat.trend === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} {stat.trend === 'increase' ? '↑' : '↓'}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">New customer signed up</p>
                  <p className="text-sm text-gray-500">
                    Acme Corp. created an account and started a new project
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">2 hours ago</div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <Film className="h-6 w-6 text-green-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Project completed</p>
                  <p className="text-sm text-gray-500">
                    TechStart Inc. product demo video was delivered and approved
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">Yesterday</div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Storage alert</p>
                  <p className="text-sm text-gray-500">
                    InnovateX is approaching their storage limit (85% used)
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">2 days ago</div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-purple-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Payment received</p>
                  <p className="text-sm text-gray-500">
                    Global Media paid their invoice ($4,200.00)
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">3 days ago</div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <HardDrive className="h-6 w-6 text-orange-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Large upload</p>
                  <p className="text-sm text-gray-500">
                    SmartSolutions uploaded 24.5 GB of raw footage
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">4 days ago</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Project Status Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Project Status Overview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Draft</div>
            <div className="text-2xl font-semibold text-gray-900">7</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-600 mb-1">In Progress</div>
            <div className="text-2xl font-semibold text-gray-900">12</div>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-sm font-medium text-yellow-600 mb-1">Review</div>
            <div className="text-2xl font-semibold text-gray-900">4</div>
            <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm font-medium text-green-600 mb-1">Completed</div>
            <div className="text-2xl font-semibold text-gray-900">34</div>
            <div className="mt-2 w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;