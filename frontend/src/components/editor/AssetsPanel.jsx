import React from "react";
import { Crop, Sparkles, RefreshCw } from "lucide-react";

export default function AssetsPanel({
  selectedAsset,
  setSelectedAsset,
  assetAiPrompt,
  setAssetAiPrompt,
  cropAspectRatio,
  setCropAspectRatio,
  handleAssetOptimize,
  handleAssetCrop,
  handleAssetAiGenerate,
  presetPhotos,
  getWebsiteImages,
  handleAssetReplace,
  handleAssetSelect
}) {
  return (
    <div className="p-5 space-y-4">
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Image Assets</h3>
        <p className="text-[10px] text-zinc-500">Configure or optimize website photos.</p>
      </div>

      {selectedAsset ? (
        <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl space-y-3.5">
          <div className="flex justify-between items-center border-b border-zinc-850 pb-2">
            <span className="text-[10px] font-bold text-zinc-400 truncate max-w-[120px]">
              {selectedAsset.label}
            </span>
            <button
              onClick={() => setSelectedAsset(null)}
              className="text-[9px] text-indigo-400 hover:underline"
            >
              Back
            </button>
          </div>
          <div className="aspect-video rounded bg-zinc-900 overflow-hidden relative border border-zinc-800">
            <img src={selectedAsset.url} className="w-full h-full object-cover" alt="Selected Thumb" />
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={handleAssetOptimize}
              className="w-full flex items-center justify-center gap-1.5 text-[10px] font-extrabold bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 py-2 rounded-lg text-emerald-400 shadow-sm"
            >
              <RefreshCw className="h-3 w-3" /> Auto Optimize (Compress)
            </button>

            {/* Mock Crop */}
            <div className="border border-zinc-850 p-2.5 rounded-lg bg-zinc-900/30 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-bold text-zinc-400">
                <span className="flex items-center gap-1">
                  <Crop className="h-3 w-3" /> Crop Aspect Ratio
                </span>
                <select
                  value={cropAspectRatio}
                  onChange={(e) => setCropAspectRatio(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-350 p-0.5 rounded"
                >
                  <option value="free">Freeform</option>
                  <option value="1:1">Square (1:1)</option>
                  <option value="16:9">Wide (16:9)</option>
                </select>
              </div>
              <button
                onClick={handleAssetCrop}
                className="w-full py-1 text-[9px] font-bold text-white bg-indigo-600 rounded hover:bg-indigo-500"
              >
                Apply Crop
              </button>
            </div>

            {/* AI image generation */}
            <div className="border border-zinc-850 p-2.5 rounded-lg bg-zinc-900/30 space-y-2">
              <span className="text-[9px] font-bold text-zinc-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-indigo-400" /> AI Asset Generator
              </span>
              <input
                type="text"
                placeholder="e.g. delicious chocolate cake"
                value={assetAiPrompt}
                onChange={(e) => setAssetAiPrompt(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-[9.5px] p-2.5 rounded text-white outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAssetAiGenerate}
                className="w-full py-1.5 text-[9.5px] font-bold text-white bg-indigo-600 rounded hover:bg-indigo-500"
              >
                Generate Asset
              </button>
            </div>

            {/* Presets library */}
            <div className="space-y-1.5 pt-1.5">
              <span className="text-[9px] font-bold text-zinc-450 uppercase block">
                Preset Photos
              </span>
              <div className="grid grid-cols-3 gap-1">
                {presetPhotos.map((ph, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAssetReplace(ph)}
                    className="aspect-square bg-zinc-900 rounded overflow-hidden border border-zinc-800 cursor-pointer hover:border-indigo-500 transition-colors"
                  >
                    <img src={ph} className="w-full h-full object-cover" alt="preset preview" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {getWebsiteImages().map((img) => (
            <div
              key={img.id}
              onClick={() => handleAssetSelect(img)}
              className="group aspect-video bg-zinc-950 border border-zinc-850 hover:border-indigo-500 rounded-lg overflow-hidden relative cursor-pointer transition-all"
            >
              <img
                src={img.url}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                alt={img.label}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                <span className="text-[8.5px] font-bold text-white truncate w-full">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
