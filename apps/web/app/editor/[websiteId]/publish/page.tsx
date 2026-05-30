"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/store/editor.store";
import { Globe, CheckCircle2, Loader2, ArrowLeft, ExternalLink, QrCode } from "lucide-react";

export default function PublishPage({ params }: { params: { websiteId: string } }) {
  const router = useRouter();
  const { websiteJSON } = useEditorStore();
  
  const [step, setStep] = useState(1);
  const [subdomain, setSubdomain] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      // Mock API call to publish
      // const res = await axios.post(`/api/publish/${params.websiteId}`, { websiteJSON, requestedSubdomain: subdomain });
      // setPublishedUrl(res.data.data.url);
      
      // Simulate delay
      await new Promise(r => setTimeout(r, 2000));
      
      const finalSubdomain = subdomain || `site-${Math.floor(Math.random() * 1000)}`;
      setPublishedUrl(`http://${finalSubdomain}.localhost:3000`);
      
      setStep(3);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!websiteJSON) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-xl font-bold mb-2">No Website Data Found</h2>
          <p className="text-slate-500 mb-6">Please return to the editor to design your site before publishing.</p>
          <button 
            onClick={() => router.push(`/editor/${params.websiteId}`)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Back to Editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900 flex flex-col items-center">
      
      <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
        <button 
          onClick={() => router.push(`/editor/${params.websiteId}`)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Editor</span>
        </button>
        <div className="font-bold text-xl tracking-tight text-slate-800">SiteForge</div>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Progress Bar */}
        <div className="bg-slate-900 text-white px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Publish Your Website</h1>
            <p className="text-slate-400 text-sm mt-1">Get your business online in seconds.</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-2 w-12 rounded-full transition-colors ${step >= i ? 'bg-blue-500' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        </div>

        <div className="p-8">
          {/* STEP 1: Domain Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Globe className="h-6 w-6" />
                <h2 className="text-xl font-bold text-slate-900">Choose your web address</h2>
              </div>
              <p className="text-slate-500">You can use a free SiteForge subdomain or connect your own custom domain later.</p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="block text-sm font-semibold mb-2 text-slate-700">Free SiteForge Subdomain</label>
                <div className="flex items-center relative">
                  <span className="absolute left-4 text-slate-400 font-medium select-none">https://</span>
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="my-awesome-business"
                    className="w-full pl-16 pr-32 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-medium text-slate-800"
                  />
                  <span className="absolute right-4 text-slate-400 font-medium select-none">.siteforge.app</span>
                </div>
                <p className="text-xs text-slate-500 mt-3">Only letters, numbers, and hyphens are allowed.</p>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleNext}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-md"
                >
                  Continue to SEO
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SEO Settings */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <div className="h-6 w-6 rounded border-2 border-current flex items-center justify-center font-bold text-xs">SEO</div>
                <h2 className="text-xl font-bold text-slate-900">Search Engine Optimization</h2>
              </div>
              <p className="text-slate-500">How your site will appear on Google and social media.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700">Meta Title</label>
                    <input 
                      type="text" 
                      defaultValue={websiteJSON.meta.title}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700">Meta Description</label>
                    <textarea 
                      rows={4}
                      defaultValue={websiteJSON.meta.description}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Google Preview Card */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <h3 className="text-sm font-semibold mb-4 text-slate-500">Google Preview</h3>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="text-xs text-slate-600 mb-1 flex items-center gap-2">
                      <span className="h-4 w-4 bg-slate-200 rounded-full inline-block"></span>
                      https://{subdomain || 'my-site'}.siteforge.app
                    </div>
                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer truncate">
                      {websiteJSON.meta.title}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {websiteJSON.meta.description || "Your meta description will appear here..."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={handleBack}
                  className="px-8 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2 disabled:opacity-70"
                >
                  {isPublishing ? (
                    <><Loader2 className="animate-spin" size={20} /> Publishing...</>
                  ) : (
                    <><Globe size={20} /> Publish to Web</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
              <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your site is live!</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-8">
                Congratulations! Your website is now published and accessible to the world.
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-lg mx-auto flex flex-col items-center">
                <a 
                  href={publishedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2 mb-6"
                >
                  {publishedUrl} <ExternalLink size={18} />
                </a>

                <div className="h-32 w-32 bg-white border border-slate-200 p-2 rounded-xl shadow-sm flex items-center justify-center mb-4">
                  <QrCode size={96} className="text-slate-800" />
                </div>
                <p className="text-xs text-slate-500">Scan to view on mobile</p>
              </div>

              <div className="mt-10 flex justify-center gap-4">
                <button 
                  onClick={() => router.push(`/dashboard`)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Go to Dashboard
                </button>
                <button 
                  onClick={() => router.push(`/editor/${params.websiteId}`)}
                  className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Return to Editor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
