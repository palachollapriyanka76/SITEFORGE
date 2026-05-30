"use client";

import { Users, MousePointerClick, TrendingUp, IndianRupee, Sparkles, ExternalLink, Edit, Share2, Globe } from "lucide-react";
import Link from "next/link";

export function OverviewPage() {
  const metrics = [
    { title: "Total Visitors", value: "24,592", change: "+12.5%", positive: true, icon: Users },
    { title: "Total Clicks", value: "12,401", change: "+8.2%", positive: true, icon: MousePointerClick },
    { title: "Active Leads", value: "342", change: "+24.1%", positive: true, icon: TrendingUp },
    { title: "Revenue", value: "₹1,45,000", change: "-2.4%", positive: false, icon: IndianRupee },
  ];

  const recentActivity = [
    { id: 1, action: "New Lead Captured", target: "John Doe (john@example.com)", time: "10 mins ago", type: "lead" },
    { id: 2, action: "Website Published", target: "mybakery.siteforge.app", time: "2 hours ago", type: "system" },
    { id: 3, action: "Theme Updated", target: "My Bakery Site", time: "4 hours ago", type: "edit" },
    { id: 4, action: "New Lead Captured", target: "Sarah Smith", time: "Yesterday", type: "lead" },
    { id: 5, action: "Domain Connected", target: "www.mybakery.com", time: "2 days ago", type: "system" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, User!</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/websites" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm text-sm">
            Manage Sites
          </Link>
          <Link href="/onboarding" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 text-sm">
            + New Website
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-slate-50 rounded-lg text-slate-500">
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{metric.title}</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: AI & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AI Growth Suggestion */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-lg border border-indigo-500/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-400 font-bold mb-3">
                <Sparkles size={20} /> AI Growth Insight
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Optimize your Hero Section</h2>
              <p className="text-indigo-200 mb-6 max-w-lg leading-relaxed">
                We noticed your bounce rate increased by 4% this week. Changing your main CTA button color to a high-contrast shade like Orange or Red could improve conversion by an estimated 12%.
              </p>
              <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors text-sm">
                Apply Suggestion in Editor
              </button>
            </div>
          </div>

          {/* Quick Actions (Primary Site) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Primary Website</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="h-32 w-48 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                [Thumbnail]
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg">My Awesome Bakery</h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full uppercase tracking-wider">Live</span>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-6">
                  mybakery.siteforge.app <ExternalLink size={14} />
                </a>
                
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                    <Edit size={16} /> Edit Site
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Activity Feed</h3>
            <button className="text-sm text-blue-600 hover:underline font-medium">View All</button>
          </div>
          
          <div className="space-y-6">
            {recentActivity.map((activity, i) => (
              <div key={activity.id} className="flex gap-4 relative">
                {i !== recentActivity.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-100"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  activity.type === 'lead' ? 'bg-green-100 text-green-600' :
                  activity.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {activity.type === 'lead' ? <Users size={14} /> :
                   activity.type === 'edit' ? <Edit size={14} /> :
                   <Globe size={14} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-500 mb-1">{activity.target}</p>
                  <p className="text-xs text-slate-400 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
