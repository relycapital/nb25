import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HardDrive, Upload } from 'lucide-react';

interface UsageData {
  month: string;
  storage_used_gb: number;
  transfer_used_gb: number;
  storage_cost_usd: number;
  transfer_cost_usd: number;
}

const Usage: React.FC = () => {
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [currentStorage, setCurrentStorage] = useState(0);
  const [currentTransfer, setCurrentTransfer] = useState(0);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const { data: billingData, error: billingError } = await supabase
        .from('billing_usage')
        .select('*')
        .order('month', { ascending: false })
        .limit(6);

      if (billingError) throw billingError;

      const formattedData = billingData.map(item => ({
        month: new Date(item.month).toLocaleString('default', { month: 'short' }),
        storage_used_gb: parseFloat(item.storage_used_gb),
        transfer_used_gb: parseFloat(item.transfer_used_gb),
        storage_cost_usd: parseFloat(item.storage_cost_usd),
        transfer_cost_usd: parseFloat(item.transfer_cost_usd),
      }));

      setUsageData(formattedData.reverse());

      // Set current usage from the latest month
      if (formattedData.length > 0) {
        const latest = formattedData[formattedData.length - 1];
        setCurrentStorage(latest.storage_used_gb);
        setCurrentTransfer(latest.transfer_used_gb);
      }
    } catch (error) {
      console.error('Error fetching usage data:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Storage & Bandwidth Usage</h1>

      {/* Current Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <HardDrive className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Storage Used</h3>
              <p className="text-3xl font-bold text-blue-600">{currentStorage.toFixed(2)} GB</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Bandwidth Used</h3>
              <p className="text-3xl font-bold text-green-600">{currentTransfer.toFixed(2)} GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage History Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Usage History</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="storage_used_gb" name="Storage (GB)" fill="#3B82F6" />
              <Bar dataKey="transfer_used_gb" name="Bandwidth (GB)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Usage;