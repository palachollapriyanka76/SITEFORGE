"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MoreHorizontal,
  UserPlus,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  website: string;
  status: LeadStatus;
  createdAt: string;
  lastActivity: string;
  notes: string;
  value: string;
}

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; icon: React.ElementType }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 border-blue-200", icon: AlertCircle },
  contacted: { label: "Contacted", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  qualified: { label: "Qualified", color: "bg-purple-100 text-purple-700 border-purple-200", icon: TrendingUp },
  converted: { label: "Converted", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  lost: { label: "Lost", color: "bg-slate-100 text-slate-500 border-slate-200", icon: XCircle },
};

const MOCK_LEADS: Lead[] = [
  {
    id: "l1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    source: "Contact Form",
    website: "My Awesome Bakery",
    status: "new",
    createdAt: "2026-05-29",
    lastActivity: "10 mins ago",
    notes: "Interested in bulk orders for a wedding event.",
    value: "₹25,000",
  },
  {
    id: "l2",
    name: "Priya Sharma",
    email: "priya.s@gmail.com",
    phone: "+91 87654 32109",
    source: "WhatsApp",
    website: "My Awesome Bakery",
    status: "contacted",
    createdAt: "2026-05-28",
    lastActivity: "2 hours ago",
    notes: "Follow-up call scheduled for tomorrow.",
    value: "₹12,000",
  },
  {
    id: "l3",
    name: "Amit Patel",
    email: "amit.patel@company.co",
    phone: "+91 76543 21098",
    source: "Google Search",
    website: "Tech Startup Landing",
    status: "qualified",
    createdAt: "2026-05-27",
    lastActivity: "1 day ago",
    notes: "Wants monthly catering service for office.",
    value: "₹1,50,000",
  },
  {
    id: "l4",
    name: "Sneha Reddy",
    email: "sneha.r@outlook.com",
    phone: "+91 65432 10987",
    source: "Instagram",
    website: "My Awesome Bakery",
    status: "converted",
    createdAt: "2026-05-25",
    lastActivity: "3 days ago",
    notes: "Placed first order. Repeat customer potential.",
    value: "₹8,500",
  },
  {
    id: "l5",
    name: "Vikram Singh",
    email: "vikram@fastmail.com",
    phone: "+91 54321 09876",
    source: "Referral",
    website: "Local Plumber",
    status: "lost",
    createdAt: "2026-05-20",
    lastActivity: "1 week ago",
    notes: "Budget too low. Might revisit later.",
    value: "₹3,000",
  },
  {
    id: "l6",
    name: "Meera Nair",
    email: "meera.nair@email.com",
    phone: "+91 43210 98765",
    source: "Contact Form",
    website: "My Awesome Bakery",
    status: "new",
    createdAt: "2026-05-29",
    lastActivity: "Just now",
    notes: "Enquiry about custom birthday cakes.",
    value: "₹5,000",
  },
  {
    id: "l7",
    name: "Arjun Desai",
    email: "arjun.d@proton.me",
    phone: "+91 32109 87654",
    source: "Google Search",
    website: "Tech Startup Landing",
    status: "contacted",
    createdAt: "2026-05-26",
    lastActivity: "5 hours ago",
    notes: "Interested in SaaS consulting package.",
    value: "₹75,000",
  },
];

export function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "value">("newest");

  const filteredLeads = MOCK_LEADS.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.website.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "newest") return b.createdAt.localeCompare(a.createdAt);
    if (sortBy === "oldest") return a.createdAt.localeCompare(b.createdAt);
    // sort by value descending (parse ₹ amount)
    const parseVal = (v: string) => parseInt(v.replace(/[₹,]/g, ""), 10);
    return parseVal(b.value) - parseVal(a.value);
  });

  const counts = {
    all: MOCK_LEADS.length,
    new: MOCK_LEADS.filter((l) => l.status === "new").length,
    contacted: MOCK_LEADS.filter((l) => l.status === "contacted").length,
    qualified: MOCK_LEADS.filter((l) => l.status === "qualified").length,
    converted: MOCK_LEADS.filter((l) => l.status === "converted").length,
    lost: MOCK_LEADS.filter((l) => l.status === "lost").length,
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads</h1>
          <p className="text-slate-500 mt-1">
            Track and manage all incoming leads from your websites.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 text-sm font-medium">
            <UserPlus size={16} /> Add Lead
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(["all", "new", "contacted", "qualified", "converted"] as const).map((key) => {
          const isActive = statusFilter === key;
          const config = key === "all" ? null : STATUS_CONFIG[key];
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                {key === "all" ? "All Leads" : config!.label}
              </span>
              <span className={`text-2xl font-bold mt-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or website..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="value">Highest Value</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Website</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.map((lead) => {
                const statusCfg = STATUS_CONFIG[lead.status];
                const StatusIcon = statusCfg.icon;
                const isExpanded = expandedLead === lead.id;

                return (
                  <>
                    <tr
                      key={lead.id}
                      onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {lead.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{lead.name}</p>
                            <p className="text-xs text-slate-400">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{lead.source}</td>
                      <td className="px-6 py-4 text-slate-600">{lead.website}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{lead.value}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${statusCfg.color}`}>
                          <StatusIcon size={12} />
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{lead.lastActivity}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Email">
                            <Mail size={15} className="text-slate-500" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Call">
                            <Phone size={15} className="text-slate-500" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="More">
                            <MoreHorizontal size={15} className="text-slate-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${lead.id}-detail`} className="bg-slate-50/50">
                        <td colSpan={7} className="px-6 py-5">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Phone</p>
                              <p className="text-slate-700 font-medium">{lead.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Created</p>
                              <p className="text-slate-700 font-medium">{lead.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Estimated Value</p>
                              <p className="text-slate-900 font-bold text-lg">{lead.value}</p>
                            </div>
                            <div className="sm:col-span-3">
                              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Notes</p>
                              <p className="text-slate-600 leading-relaxed">{lead.notes}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredLeads.map((lead) => {
            const statusCfg = STATUS_CONFIG[lead.status];
            const StatusIcon = statusCfg.icon;
            const isExpanded = expandedLead === lead.id;

            return (
              <div key={lead.id} className="p-4">
                <button
                  onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {lead.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-400">{lead.email}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border ${statusCfg.color}`}>
                      <StatusIcon size={11} />
                      {statusCfg.label}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{lead.value}</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone</span>
                      <span className="text-slate-700 font-medium">{lead.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Source</span>
                      <span className="text-slate-700">{lead.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Website</span>
                      <span className="text-slate-700">{lead.website}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs">Notes</span>
                      <p className="text-slate-600 mt-1">{lead.notes}</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                        <Mail size={14} /> Email
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                        <Phone size={14} /> Call
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-16">
            <UserPlus className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No leads found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <p>
          Showing <span className="font-semibold text-slate-900">{filteredLeads.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{MOCK_LEADS.length}</span> leads
        </p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-500">
            Previous
          </button>
          <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-medium">1</button>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-500">
            2
          </button>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-500">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
