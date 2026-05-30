import { create } from "zustand";
import { WebsiteJSON, WebsiteJSONSection } from "@siteforge/types";
import debounce from "lodash/debounce";
import axios from "axios";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface EditorState {
  websiteId: string | null;
  websiteJSON: WebsiteJSON | null;
  selectedSectionId: string | null;
  historyStack: WebsiteJSON[];
  historyIndex: number;
  device: DeviceType;
  isSaving: boolean;

  // Actions
  setWebsite: (data: WebsiteJSON, websiteId?: string) => void;
  loadWebsite: (websiteId: string) => Promise<void>;
  setDevice: (device: DeviceType) => void;
  selectSection: (id: string | null) => void;
  updateSection: (id: string, updates: Partial<WebsiteJSONSection>) => void;
  addSection: (section: WebsiteJSONSection, index?: number) => void;
  removeSection: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  pushHistory: (newJson: WebsiteJSON) => void;

  // Save
  save: () => Promise<void>;
}

// Debounced save helper
const debouncedSave = debounce(async (websiteId: string, json: WebsiteJSON) => {
  try {
    await axios.patch(`/api/websites/${websiteId}/json`, json);
    console.log("Autosaved to backend successfully");
  } catch (error) {
    console.error("Autosave failed", error);
  }
}, 3000);

export const useEditorStore = create<EditorState>((set, get) => ({
  websiteId: null,
  websiteJSON: null,
  selectedSectionId: null,
  historyStack: [],
  historyIndex: -1,
  device: "desktop",
  isSaving: false,

  setWebsite: (data, websiteId) => {
    set({ 
      websiteJSON: data, 
      historyStack: [data], 
      historyIndex: 0,
      ...(websiteId ? { websiteId } : {})
    });
  },

  loadWebsite: async (websiteId) => {
    set({ isSaving: true });
    try {
      const response = await axios.get(`/api/websites/${websiteId}/json`);
      if (response.data && response.data.success) {
        get().setWebsite(response.data.data, websiteId);
      } else {
        throw new Error("Failed to load website JSON");
      }
    } catch (error) {
      console.error("Failed to load website:", error);
    } finally {
      set({ isSaving: false });
    }
  },

  setDevice: (device) => set({ device }),
  
  selectSection: (id) => set({ selectedSectionId: id }),

  updateSection: (id, updates) => {
    const { websiteJSON, pushHistory } = get();
    if (!websiteJSON) return;

    const newJson = JSON.parse(JSON.stringify(websiteJSON)) as WebsiteJSON; // Deep copy to prevent mutating historyStack items directly
    const page = newJson.pages[0];
    const sectionIndex = page.sections.findIndex((s) => s.id === id);
    
    if (sectionIndex !== -1) {
      page.sections[sectionIndex] = { ...page.sections[sectionIndex], ...updates };
      pushHistory(newJson);
    }
  },

  addSection: (section, index) => {
    const { websiteJSON, pushHistory } = get();
    if (!websiteJSON) return;

    const newJson = JSON.parse(JSON.stringify(websiteJSON)) as WebsiteJSON;
    const page = newJson.pages[0];
    
    if (typeof index === 'number') {
      page.sections.splice(index, 0, section);
    } else {
      page.sections.push(section);
    }
    
    pushHistory(newJson);
  },

  removeSection: (id) => {
    const { websiteJSON, pushHistory, selectedSectionId } = get();
    if (!websiteJSON) return;

    const newJson = JSON.parse(JSON.stringify(websiteJSON)) as WebsiteJSON;
    const page = newJson.pages[0];
    page.sections = page.sections.filter((s) => s.id !== id);
    
    const newSelected = selectedSectionId === id ? null : selectedSectionId;
    
    set({ selectedSectionId: newSelected });
    pushHistory(newJson);
  },

  reorderSections: (activeId, overId) => {
    const { websiteJSON, pushHistory } = get();
    if (!websiteJSON) return;

    const newJson = JSON.parse(JSON.stringify(websiteJSON)) as WebsiteJSON;
    const page = newJson.pages[0];
    
    const oldIndex = page.sections.findIndex(s => s.id === activeId);
    const newIndex = page.sections.findIndex(s => s.id === overId);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      const [movedItem] = page.sections.splice(oldIndex, 1);
      page.sections.splice(newIndex, 0, movedItem);
      pushHistory(newJson);
    }
  },

  pushHistory: (newJson) => {
    const { historyStack, historyIndex, websiteId } = get();
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(newJson);
    
    // Keep last 50 states
    if (newStack.length > 50) newStack.shift();
    
    set({
      websiteJSON: newJson,
      historyStack: newStack,
      historyIndex: newStack.length - 1,
      isSaving: true,
    });

    if (websiteId) {
      debouncedSave(websiteId, newJson);
    }
    setTimeout(() => set({ isSaving: false }), 1000); // Visual saving indicator
  },

  undo: () => {
    const { historyStack, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ websiteJSON: historyStack[newIndex], historyIndex: newIndex });
    }
  },

  redo: () => {
    const { historyStack, historyIndex } = get();
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      set({ websiteJSON: historyStack[newIndex], historyIndex: newIndex });
    }
  },

  save: async () => {
    const { websiteJSON, websiteId } = get();
    if (!websiteJSON || !websiteId) return;
    set({ isSaving: true });
    try {
      await axios.patch(`/api/websites/${websiteId}/json`, websiteJSON);
      console.log("Saved manually to backend successfully", websiteJSON);
    } catch (e) {
      console.error("Manual save failed", e);
    } finally {
      set({ isSaving: false });
    }
  },
}));

