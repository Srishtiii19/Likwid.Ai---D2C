import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [companyName, setCompanyName] = useState('Bio Mac Lifesciences');

  // Sample data
  const stockData = [
    { name: 'Under Stock', value: 5.17, color: '#f59e0b', items: 15 },
    { name: 'Overstock', value: 27.59, color: '#ef4444', items: 32 },
    { name: 'Optimum Stock', value: 67.24, color: '#10b981', items: 89 }
  ];

  const dealsByStatus = [
    { name: 'Pending', value: 100, color: '#3b82f6' },
    { name: 'Converted', value: 0, color: '#10b981' },
    { name: 'Cancelled', value: 0, color: '#ef4444' }
  ];

  const saleOrders = [
    { orderName: 'ChocolateX Rigid King Box', customer: 'Likwid Techserve', quantity: 2000.00, amount: 200000.00, status: 'F' },
    { orderName: 'Gladiator Box', customer: 'Tensav Pvt Ltd', quantity: 1000.00, amount: 50000.00, status: 'F' },
    { orderName: 'Gladiator Box', customer: 'Tensav Pvt Ltd', quantity: 2000.00, amount: 100000.00, status: 'F' },
    { orderName: 'Gynofree', customer: 'Likwid Techserve', quantity: 5000.00, amount: 100000.00, status: 'F' },
    { orderName: 'Macashwajit 30 Caps', customer: 'Likwid Techserve', quantity: 30000.00, amount: 45000.00, status: 'A' },
    { orderName: 'NA', customer: 'Likwid Techserve', quantity: 1000.00, amount: 15000.00, status: 'F' }
  ];

  const purchaseOrders = [
    { poItem: 'Ashwagandha Raw Herb', vendor: 'Tirupati Herbs', quantity: 100.00, amount: 26250.00, status: 'N' },
    { poItem: 'Brute Bottles - 200ml', vendor: 'Pure Pet Industries', quantity: 10000.00, amount: 33630.00, status: 'N' },
    { poItem: 'Coughenza Cartons', vendor: 'Tirupati Herbs', quantity: 13000.00, amount: 76700.00, status: 'N' },
    { poItem: 'Coughenza Labels', vendor: 'Tirupati Herbs', quantity: 15000.00, amount: 17700.00, status: 'N' },
    { poItem: 'Gynofree Cartons', vendor: 'Pure Pet Industries', quantity: 3000.00, amount: 9558.00, status: 'N' },
    { poItem: 'Nuts & Bolts', vendor: 'Pure Pet Industries', quantity: 100000.00, amount: 118000.00, status: 'N' }
  ];

  const StatCard = ({ title, value, subtitle, bgColor }) => {
    return (
      <div className={`${bgColor} rounded-lg p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm opacity-90">{subtitle}</div>
          </div>
          <div className="text-3xl opacity-70">
            {title.includes('Order') ? '📊' : title.includes('Customers') ? '👥' : title.includes('Goods') ? '📦' : '💰'}
          </div>
        </div>
      </div>
    );
  };

  const StockChart = ({ data, title }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {data.map((item, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <div className="text-sm font-medium" style={{ color: item.color }}>
                {item.name}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {item.value}%
              </div>
              <div className="text-sm text-gray-600">
                {item.items} Items
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    backgroundColor: item.color,
                    width: `${item.value}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChartComponent = ({ data, title }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OrderTable = ({ orders, type }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {type === 'sale' ? 'Sale Orders' : 'Purchase Orders'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {type === 'sale' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {type === 'sale' ? order.orderName : order.poItem}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {type === 'sale' ? order.customer : order.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'F' ? 'bg-green-100 text-green-800' :
                      order.status === 'A' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status === 'F' ? 'Fulfilled' : 
                       order.status === 'A' ? 'Active' : 'New'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header - removed container */}
      <h1 className="text-2xl font-bold text-gray-800">Welcome, Bing</h1>

      {/* Stats Grid - changed to 2 rows */}
      <div className="grid grid-rows-2 grid-cols-2 gap-6">
        <StatCard
          title="Average Order Value"
          value="3525250.00"
          subtitle="Average Order Value: 117508.33 from 30 pending orders"
          bgColor="bg-blue-500"
        />
        <StatCard
          title="Customers"
          value="5"
          subtitle="Customers from 4 categories"
          bgColor="bg-indigo-500"
        />
        <StatCard
          title="Add Finished Goods"
          value="3515615.73"
          subtitle="from 3 finished goods"
          bgColor="bg-purple-500"
        />
        <StatCard
          title="Total Items"
          value="3515615.73"
          subtitle="from 55 items"
          bgColor="bg-purple-600"
        />
      </div>

      {/* Charts Row - 2 rows layout */}
      <div className="space-y-6">
        <StockChart data={stockData} title="Stock Analysis" />
        <div className="grid grid-cols-2 gap-6">
          <PieChartComponent data={dealsByStatus} title="Deals by Status" />
          <PieChartComponent data={dealsByStatus} title="Deals by Amount" />
        </div>
      </div>

      {/* Orders Section */}
      <div className="space-y-8">
        <OrderTable orders={saleOrders} type="sale" />
        <OrderTable orders={purchaseOrders} type="purchase" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - removed Likwid.Ai heading */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Removed the Likwid.Ai heading */}
            </div>
            <nav className="flex space-x-8">
              {/* Removed Dashboard navigation option */}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div className="px-4 py-2 sm:px-0">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;