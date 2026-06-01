import React from "react";

export default function PropertiesPanel({
  selectedElement,
  setSelectedElement,
  handleTextChange,
  handleTextBlur,
  updateImageURL,
  setActiveTab,
  handleAssetSelect,
  theme,
  websiteJSON,
  updateWebsiteJSON,
}) {
  return (
    <>
      {selectedElement ? (
        <div className="space-y-5">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Edit Element</span>
            <button 
              onClick={() => setSelectedElement(null)}
              className="text-[10px] text-zinc-400 hover:text-white"
            >
              Clear Selection
            </button>
          </div>

          {/* Text Element Properties */}
          {selectedElement.type === "text" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Content text</label>
                {selectedElement.fieldKey === "description" || selectedElement.fieldKey === "subtitle" ? (
                  <textarea 
                    value={selectedElement.value || ""}
                    onChange={(e) => {
                      setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                      handleTextChange(selectedElement.sectionId, selectedElement.fieldKey, e.target.value, selectedElement.index);
                    }}
                    onBlur={handleTextBlur}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white outline-none focus:border-indigo-500 h-28 resize-none leading-relaxed"
                  />
                ) : (
                  <input 
                    type="text"
                    value={selectedElement.value || ""}
                    onChange={(e) => {
                      setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                      handleTextChange(selectedElement.sectionId, selectedElement.fieldKey, e.target.value, selectedElement.index);
                    }}
                    onBlur={handleTextBlur}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white outline-none focus:border-indigo-500 font-bold"
                  />
                )}
              </div>
              
              {/* Text alignment styling preset */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-450 uppercase block">Alignment</span>
                <div className="grid grid-cols-3 bg-zinc-950 p-1 border border-zinc-800 rounded-lg text-center text-xs">
                  <button className="p-1 rounded hover:bg-zinc-850 hover:text-white">Left</button>
                  <button className="p-1 rounded bg-zinc-850 text-white font-bold">Center</button>
                  <button className="p-1 rounded hover:bg-zinc-850 hover:text-white">Right</button>
                </div>
              </div>
            </div>
          )}

          {/* Button Element Properties */}
          {selectedElement.type === "button" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Button Label</label>
                <input 
                  type="text"
                  value={selectedElement.value || ""}
                  onChange={(e) => {
                    setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                    handleTextChange(selectedElement.sectionId, selectedElement.fieldKey, e.target.value, selectedElement.index);
                  }}
                  onBlur={handleTextBlur}
                  className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white outline-none focus:border-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Action Link / Anchor</label>
                <input 
                  type="text"
                  defaultValue="#booking"
                  placeholder="#booking or external URL"
                  className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          )}

          {/* Image Element Properties */}
          {selectedElement.type === "image" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Selected Image URL</label>
                <input 
                  type="text"
                  value={selectedElement.value || ""}
                  onChange={(e) => {
                    setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                    updateImageURL(selectedElement.sectionId, selectedElement.fieldKey, e.target.value);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white outline-none focus:border-indigo-500 font-mono text-[9px]"
                />
              </div>

              <button 
                onClick={() => {
                  setActiveTab("assets");
                  handleAssetSelect({
                    sectionId: selectedElement.sectionId,
                    type: selectedElement.fieldKey,
                    url: selectedElement.value,
                    label: `Selected Canvas Image`
                  });
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow transition-all"
              >
                Open Image Editor Tools
              </button>
            </div>
          )}

          {/* Section level properties */}
          {selectedElement.type === "section" && (
            <div className="space-y-4">
              <span className="text-[10px] text-zinc-450 leading-relaxed block">You have selected the Section container block. Configure spacing details below.</span>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Row Padding</label>
                <select 
                  value={theme.spacing || "normal"}
                  onChange={(e) => {
                    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                    newJSON.theme.spacing = e.target.value;
                    updateWebsiteJSON(newJSON);
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2 rounded text-white outline-none"
                >
                  <option value="compact">Compact Height</option>
                  <option value="normal">Standard Padding</option>
                  <option value="large">Spacious Margins</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-1 border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Global SEO Settings</h3>
            <p className="text-[10px] text-zinc-500 leading-normal">Optimizations applied globally.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-450 uppercase block">Website Meta Title</label>
              <input 
                type="text" 
                placeholder="e.g. Pizza Palace Bakery Pune" 
                defaultValue="Oven Fresh Bakery Shop"
                className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-450 uppercase block">Meta Description</label>
              <textarea 
                placeholder="Describe your site details for Google indexing..." 
                defaultValue="Order warm, oven-fresh bakery items, croissants and bread rolls in Pune."
                className="w-full bg-zinc-950 border border-zinc-800 text-xs p-3 rounded-lg text-white h-24 outline-none focus:border-indigo-500 resize-none leading-relaxed"
              />
            </div>

            <div className="p-3 bg-indigo-600/5 border border-indigo-500/10 rounded-xl space-y-1">
              <span className="text-[10.5px] font-bold text-indigo-400 block">⚡ Quick Tip</span>
              <p className="text-[9.5px] text-zinc-400 leading-normal">Click any text block, image card, or section directly on the center canvas to customize its content instantly.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
