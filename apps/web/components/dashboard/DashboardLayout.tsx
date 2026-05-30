"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Globe, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Settings, 
  Zap, 
  Menu,
  X
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: Home, exact: true },
  { href: "/dashboard/websites", label: "Websites", icon: Globe },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
          <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm">SF</div>
            SiteForge
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  active 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-slate-800 hover:text-white text-slate-400"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
              <Zap size={16} /> Pro Plan
            </div>
            <p className="text-xs text-slate-500 mb-3">You have access to all premium features.</p>
            <button className="w-full py-1.5 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-200 transition-colors">
              Manage Billing
            </button>
          </div>

          <div className="flex items-center gap-3 px-2">
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white line-clamp-1">{user?.fullName || "User"}</span>
              <span className="text-xs text-slate-500 line-clamp-1">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 z-50">
        <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-xs">SF</div>
          SiteForge
        </div>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-50">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                active ? "text-blue-600" : "text-slate-500"
              }`}
            >
              <Icon size={20} className={active ? "stroke-[2.5px]" : ""} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
