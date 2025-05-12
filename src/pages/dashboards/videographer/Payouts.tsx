import React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const Payouts = () => {
  const supabase = useSupabaseClient();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payouts</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold">$12,450</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-gray-500">Next Payout</p>
              <p className="text-2xl font-bold">$2,300</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-500">Completed Projects</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payout History Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Payout History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Wedding Highlights</td>
                <td className="px-6 py-4 whitespace-nowrap">$1,200</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-05-01</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Corporate Event</td>
                <td className="px-6 py-4 whitespace-nowrap">$800</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-04-28</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Product Launch</td>
                <td className="px-6 py-4 whitespace-nowrap">$1,500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-04-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payouts;