"use client";

import { useState } from "react";
import {
  User,
  Building2,
  Globe,
  Palette,
  Bell,
  Shield,
  Link2,
  CreditCard,
  Save,
  Check,
  Camera,
  ExternalLink,
  Copy,
  ChevronRight,
  Smartphone,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
} from "lucide-react";

type SettingsTab = "profile" | "business" | "domain" | "notifications" | "integrations";

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business Info", icon: Building2 },
  { id: "domain", label: "Domain & SEO", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Link2 },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account and website preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm text-sm ${
            saved
              ? "bg-emerald-600 text-white shadow-emerald-500/20"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <nav className="lg:w-56 shrink-0">
          {/* Mobile: horizontal scroll */}
          <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "business" && <BusinessSettings />}
          {activeTab === "domain" && <DomainSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "integrations" && <IntegrationSettings />}
        </div>
      </div>
    </div>
  );
}

/* ─── Profile Settings ─── */
function ProfileSettings() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Personal Information</h2>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20">
              JD
            </div>
            <button className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Profile Photo</h3>
            <p className="text-sm text-slate-500 mt-1 mb-3">
              Recommended: Square image, at least 200x200px.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                Upload
              </button>
              <button className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-slate-400 mt-1.5">Email is managed through your Clerk account.</p>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-slate-500 mb-4">
          Deleting your account is permanent. All data, websites, and leads will be lost.
        </p>
        <button className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">
          Delete Account
        </button>
      </div>
    </div>
  );
}

/* ─── Business Settings ─── */
function BusinessSettings() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-8">
      <h2 className="text-lg font-bold text-slate-900">Business Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name</label>
          <input
            type="text"
            defaultValue="My Awesome Bakery"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
          <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option>Food & Beverage</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Real Estate</option>
            <option>E-commerce</option>
            <option>Services</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
          <input
            type="text"
            defaultValue="Mumbai, India"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Business Description</label>
          <textarea
            rows={4}
            defaultValue="A premium artisan bakery crafting delicious cakes, pastries, and breads since 2020."
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Business Email</label>
          <input
            type="email"
            defaultValue="info@myawesomebakery.com"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Business Phone</label>
          <input
            type="tel"
            defaultValue="+91 22 1234 5678"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Smartphone size={16} /> Social Media Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Instagram, label: "Instagram", placeholder: "https://instagram.com/yourbrand" },
            { icon: Facebook, label: "Facebook", placeholder: "https://facebook.com/yourbrand" },
            { icon: Twitter, label: "X / Twitter", placeholder: "https://x.com/yourbrand" },
            { icon: Linkedin, label: "LinkedIn", placeholder: "https://linkedin.com/company/yourbrand" },
          ].map(({ icon: SocialIcon, label, placeholder }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 rounded-lg text-slate-500 shrink-0">
                <SocialIcon size={16} />
              </div>
              <input
                type="url"
                placeholder={placeholder}
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Domain & SEO Settings ─── */
function DomainSettings() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Subdomain</h2>
        <p className="text-sm text-slate-500 mb-6">Your free SiteForge subdomain for your published website.</p>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
            <input
              type="text"
              defaultValue="mybakery"
              className="flex-1 px-4 py-2.5 bg-transparent focus:outline-none text-sm font-medium"
            />
            <span className="px-4 py-2.5 text-sm text-slate-400 border-l border-slate-200 bg-white">.siteforge.app</span>
          </div>
          <button
            onClick={() => handleCopy("mybakery.siteforge.app")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-slate-900">Custom Domain</h2>
          <span className="px-2.5 py-1 text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full uppercase tracking-wider">
            Pro
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-6">Connect your own domain to your SiteForge website.</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="www.yourdomain.com"
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
          />
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
            Connect Domain
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">DNS Configuration Required</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-mono text-xs w-16">CNAME</span>
              <span className="text-slate-700 font-medium flex-1 font-mono text-xs">www</span>
              <span className="text-slate-500 font-mono text-xs">→</span>
              <span className="text-slate-900 font-medium font-mono text-xs">cname.siteforge.app</span>
            </div>
            <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-mono text-xs w-16">A</span>
              <span className="text-slate-700 font-medium flex-1 font-mono text-xs">@</span>
              <span className="text-slate-500 font-mono text-xs">→</span>
              <span className="text-slate-900 font-medium font-mono text-xs">76.76.21.21</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-2">SEO Settings</h2>
        <p className="text-sm text-slate-500 mb-6">Configure how your website appears in search engine results.</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Title</label>
            <input
              type="text"
              defaultValue="My Awesome Bakery — Fresh Cakes & Pastries in Mumbai"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
            />
            <p className="text-xs text-slate-400 mt-1.5">52 / 60 characters</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Description</label>
            <textarea
              rows={3}
              defaultValue="Order the best artisan cakes, pastries, and fresh bread in Mumbai. Custom designs for weddings, birthdays & corporate events."
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm resize-none"
            />
            <p className="text-xs text-slate-400 mt-1.5">118 / 160 characters</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">OG Image URL</label>
            <input
              type="url"
              placeholder="https://yourdomain.com/og-image.png"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
            />
          </div>

          {/* Google Preview */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Google Search Preview</p>
            <div className="space-y-1">
              <p className="text-blue-700 text-lg font-medium hover:underline cursor-pointer">
                My Awesome Bakery — Fresh Cakes & Pastries in Mumbai
              </p>
              <p className="text-emerald-700 text-sm">mybakery.siteforge.app</p>
              <p className="text-sm text-slate-500 line-clamp-2">
                Order the best artisan cakes, pastries, and fresh bread in Mumbai. Custom designs for weddings, birthdays & corporate events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Notification Settings ─── */
function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newLead: true,
    leadConverted: true,
    weeklyReport: true,
    securityAlerts: true,
    productUpdates: false,
    marketingTips: false,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-1">
      <h2 className="text-lg font-bold text-slate-900 mb-1">Email Notifications</h2>
      <p className="text-sm text-slate-500 mb-6">Choose which emails you want to receive.</p>

      <div className="divide-y divide-slate-100">
        {[
          { key: "newLead" as const, title: "New Lead Captured", desc: "Get notified when someone submits a contact form on your site." },
          { key: "leadConverted" as const, title: "Lead Converted", desc: "Receive an email when a lead's status changes to Converted." },
          { key: "weeklyReport" as const, title: "Weekly Analytics Report", desc: "A summary of your website traffic and lead performance every Monday." },
          { key: "securityAlerts" as const, title: "Security Alerts", desc: "Important security updates about your account and websites." },
          { key: "productUpdates" as const, title: "Product Updates", desc: "New features, improvements, and tips from the SiteForge team." },
          { key: "marketingTips" as const, title: "Marketing Tips", desc: "AI-powered growth suggestions and marketing best practices." },
        ].map(({ key, title, desc }) => (
          <div key={key} className="flex items-center justify-between py-5">
            <div className="flex-1 mr-4">
              <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                notifications[key] ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  notifications[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Integration Settings ─── */
function IntegrationSettings() {
  const integrations = [
    {
      name: "Google Analytics",
      desc: "Track website visitors and user behavior with GA4.",
      connected: true,
      icon: "📊",
    },
    {
      name: "WhatsApp Business",
      desc: "Connect your WhatsApp number for direct lead capture.",
      connected: false,
      icon: "💬",
    },
    {
      name: "Razorpay",
      desc: "Accept online payments directly on your website.",
      connected: true,
      icon: "💳",
    },
    {
      name: "Mailchimp",
      desc: "Sync leads to your email marketing campaigns.",
      connected: false,
      icon: "✉️",
    },
    {
      name: "Google My Business",
      desc: "Sync reviews and business info from your GMB listing.",
      connected: false,
      icon: "🏢",
    },
    {
      name: "Facebook Pixel",
      desc: "Track conversions and retarget visitors with Meta ads.",
      connected: false,
      icon: "📱",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-lg font-bold text-slate-900">Integrations</h2>
        <p className="text-sm text-slate-500 mt-1">Connect third-party services to supercharge your website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                {integration.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">{integration.name}</h3>
                  {integration.connected && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-wider">
                      Connected
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{integration.desc}</p>
              </div>
            </div>
            <button
              className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${
                integration.connected
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20"
              }`}
            >
              {integration.connected ? "Manage" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
