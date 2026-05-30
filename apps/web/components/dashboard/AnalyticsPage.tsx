"use client";

import { useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import { Calendar, Download, TrendingUp } from "lucide-react";

// Mock Data
const visitorsData = [
  { name: 'Mon', visitors: 4000, pageViews: 2400 },
  { name: 'Tue', visitors: 3000, pageViews: 1398 },
  { name: 'Wed', visitors: 2000, pageViews: 9800 },
  { name: 'Thu', visitors: 2780, pageViews: 3908 },
  { name: 'Fri', visitors: 1890, pageViews: 4800 },
  { name: 'Sat', visitors: 2390, pageViews: 3800 },
  { name: 'Sun', visitors: 3490, pageViews: 4300 },
];

const trafficSourceData = [
  { name: 'Direct', value: 4000 },
  { name: 'Social', value: 3000 },
  { name: 'Organic', value: 2000 },
  { name: 'Referral', value: 2780 },
];

const deviceData = [
  { name: 'Mobile', value: 55 },
  { name: 'Desktop', value: 35 },
  { name: 'Tablet', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#0f172a'];

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">Deep dive into your website performance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            {['7d', '30d', '90d', 'Custom'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  dateRange === range ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Traffic Overview</h3>
            <p className="text-sm text-slate-500">Visitors vs Page Views over time</p>
          </div>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm font-bold">
            <TrendingUp size={16} /> +12.5%
          </div>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Traffic Sources</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSourceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#0f172a', fontWeight: 500 }} dx={-10} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" name="Visitors" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Device Breakdown</h3>
          <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Top Pages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Page Path</th>
                <th className="px-6 py-4 text-right">Views</th>
                <th className="px-6 py-4 text-right">Unique Visitors</th>
                <th className="px-6 py-4 text-right">Avg. Time</th>
                <th className="px-6 py-4 text-right">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { path: "/", views: "45,291", unique: "32,100", time: "2m 14s", bounce: "42%" },
                { path: "/about", views: "12,402", unique: "9,800", time: "1m 45s", bounce: "55%" },
                { path: "/services/consulting", views: "8,920", unique: "6,500", time: "3m 10s", bounce: "35%" },
                { path: "/contact", views: "4,105", unique: "3,800", time: "0m 45s", bounce: "65%" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors text-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-900">{row.path}</td>
                  <td className="px-6 py-4 text-right">{row.views}</td>
                  <td className="px-6 py-4 text-right">{row.unique}</td>
                  <td className="px-6 py-4 text-right">{row.time}</td>
                  <td className="px-6 py-4 text-right">{row.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
