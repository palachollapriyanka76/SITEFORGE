"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
  MoreHorizontal,
  IndianRupee,
  ShoppingBag,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  items: string;
  total: string;
  status: OrderStatus;
  date: string;
  website: string;
  paymentMethod: string;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Truck },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600 border-red-200", icon: XCircle },
};

const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    orderId: "ORD-2026-001",
    customer: "Neha Gupta",
    email: "neha@email.com",
    items: "Chocolate Truffle Cake x1, Croissant x6",
    total: "₹2,450",
    status: "delivered",
    date: "2026-05-29",
    website: "My Awesome Bakery",
    paymentMethod: "Razorpay",
  },
  {
    id: "o2",
    orderId: "ORD-2026-002",
    customer: "Rohit Mehta",
    email: "rohit.m@gmail.com",
    items: "Custom Wedding Cake",
    total: "₹15,000",
    status: "processing",
    date: "2026-05-28",
    website: "My Awesome Bakery",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "o3",
    orderId: "ORD-2026-003",
    customer: "Ananya Joshi",
    email: "ananya.j@outlook.com",
    items: "Birthday Cupcakes x24",
    total: "₹3,600",
    status: "pending",
    date: "2026-05-28",
    website: "My Awesome Bakery",
    paymentMethod: "Razorpay",
  },
  {
    id: "o4",
    orderId: "ORD-2026-004",
    customer: "Karthik Nair",
    email: "karthik@company.in",
    items: "Corporate Lunch Box x50",
    total: "₹25,000",
    status: "shipped",
    date: "2026-05-27",
    website: "My Awesome Bakery",
    paymentMethod: "Razorpay",
  },
  {
    id: "o5",
    orderId: "ORD-2026-005",
    customer: "Fatima Khan",
    email: "fatima.k@email.com",
    items: "Red Velvet Cake x1",
    total: "₹1,200",
    status: "cancelled",
    date: "2026-05-25",
    website: "My Awesome Bakery",
    paymentMethod: "COD",
  },
  {
    id: "o6",
    orderId: "ORD-2026-006",
    customer: "Deepak Rao",
    email: "deepak.rao@business.com",
    items: "Consulting Session - 2hrs",
    total: "₹8,000",
    status: "delivered",
    date: "2026-05-24",
    website: "Tech Startup Landing",
    paymentMethod: "Razorpay",
  },
];

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = "₹55,250";
  const pendingOrders = MOCK_ORDERS.filter((o) => o.status === "pending" || o.status === "processing").length;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h1>
          <p className="text-slate-500 mt-1">Track and manage orders from your websites.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
          <Download size={16} /> Export Orders
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <IndianRupee size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900">{totalRevenue}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <ShoppingBag size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Orders</p>
            <p className="text-2xl font-bold text-slate-900">{MOCK_ORDERS.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending / Processing</p>
            <p className="text-2xl font-bold text-slate-900">{pendingOrders}</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by order ID, customer, or items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => {
                const statusCfg = STATUS_CONFIG[order.status];
                const StatusIcon = statusCfg.icon;
                return (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{order.orderId}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{order.customer}</p>
                      <p className="text-xs text-slate-400">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate">{order.items}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${statusCfg.color}`}>
                        <StatusIcon size={12} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{order.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="View Details">
                          <Eye size={15} className="text-slate-500" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="More">
                          <MoreHorizontal size={15} className="text-slate-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredOrders.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status];
            const StatusIcon = statusCfg.icon;
            return (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-500">{order.orderId}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full border ${statusCfg.color}`}>
                    <StatusIcon size={11} />
                    {statusCfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{order.customer}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{order.items}</p>
                  </div>
                  <p className="font-bold text-slate-900">{order.total}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><CalendarDays size={12} /> {order.date}</span>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No orders found</h3>
            <p className="text-slate-500 mt-1">Orders from your website will appear here.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <p>
          Showing <span className="font-semibold text-slate-900">{filteredOrders.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{MOCK_ORDERS.length}</span> orders
        </p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-500">
            Previous
          </button>
          <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-medium">1</button>
          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-500">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
