"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MoreVertical, Edit2, ExternalLink, Copy, Trash2, Search, Filter, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export function WebsitesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for websites
  const websites = [
    { id: "123", name: "My Awesome Bakery", url: "mybakery.siteforge.app", status: "published", visitors: "12.4k", lastEdited: "2 hours ago", thumbnail: "" },
    { id: "124", name: "Tech Startup Landing", url: "techstart.siteforge.app", status: "draft", visitors: "0", lastEdited: "1 day ago", thumbnail: "" },
    { id: "125", name: "Local Plumber", url: "www.bestplumbing.com", status: "published", visitors: "3.2k", lastEdited: "5 days ago", thumbnail: "" },
  ];

  const filteredSites = websites.filter(site => site.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Websites</h1>
          <p className="text-slate-500 mt-1">Manage, edit, and publish your sites.</p>
        </div>
        <Link href="/onboarding" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 w-full sm:w-auto">
          <Plus size={18} /> Create New Website
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search websites..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
          <Filter size={18} /> Filter
        </button>
      </div>

      {filteredSites.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
          <Globe className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">No websites found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <div key={site.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              
              <div className="relative h-48 bg-slate-100 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                {/* Thumbnail placeholder */}
                <div className="text-slate-300 font-medium">Thumbnail Image</div>
                
                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button 
                    onClick={() => router.push(`/editor/${site.id}`)}
                    className="px-4 py-2 bg-white text-slate-900 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform text-sm flex items-center gap-2"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                </div>

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm ${
                    site.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {site.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-1" title={site.name}>{site.name}</h3>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>
                
                {site.status === "published" ? (
                  <a href={`http://${site.url}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-4 truncate">
                    {site.url} <ExternalLink size={12} />
                  </a>
                ) : (
                  <div className="text-sm text-slate-400 mb-4 italic">Not published yet</div>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                  <div>
                    <span className="font-bold text-slate-900">{site.visitors}</span> visitors
                  </div>
                  <div className="text-xs">
                    Edited {site.lastEdited}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

