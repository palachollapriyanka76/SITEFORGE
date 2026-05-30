"use client";

import { useEditorStore } from "@/store/editor.store";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SectionRenderer } from "./SectionRenderer";
import { useState } from "react";

export function EditorCanvas() {
  const { websiteJSON, reorderSections, addSection, device, selectSection } = useEditorStore();
  const [activeDragType, setActiveDragType] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    if (event.active.data.current?.type === "new-section") {
      setActiveDragType(event.active.data.current.sectionType);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragType(null);
    const { active, over } = event;
    
    if (over) {
      if (active.data.current?.type === "new-section") {
        // Dropping a new section from the sidebar
        const sectionType = active.data.current.sectionType;
        if (!websiteJSON) return;
        
        // Find drop index
        const page = websiteJSON.pages[0];
        const overIndex = page.sections.findIndex(s => s.id === over.id);
        const dropIndex = overIndex !== -1 ? overIndex : page.sections.length;

        const newSection = {
          id: `section-${Date.now()}`,
          type: sectionType,
          order: 0,
          visible: true,
          content: { title: `New ${sectionType} Section`, subtitle: "Edit me" },
          styles: {},
          animations: {}
        };

        addSection(newSection, dropIndex);
      } else if (active.id !== over.id) {
        // Reordering existing sections
        reorderSections(active.id as string, over.id as string);
      }
    } else if (active.data.current?.type === "new-section") {
      // Dropped on empty area or end of list
      const sectionType = active.data.current.sectionType;
      const newSection = {
        id: `section-${Date.now()}`,
        type: sectionType,
        order: 0,
        visible: true,
        content: { title: `New ${sectionType} Section`, subtitle: "Edit me" },
        styles: {},
        animations: {}
      };
      addSection(newSection);
    }
  };

  if (!websiteJSON || !websiteJSON.pages[0]) return null;

  const sections = websiteJSON.pages[0].sections;

  // Responsive device styling
  let canvasWidth = "w-full";
  if (device === "mobile") canvasWidth = "w-[375px] mx-auto";
  if (device === "tablet") canvasWidth = "w-[768px] mx-auto";

  return (
    <div className="p-8 min-h-full flex flex-col items-center" onClick={() => selectSection(null)}>
      <div 
        className={`bg-white text-slate-900 shadow-2xl transition-all duration-300 min-h-[800px] overflow-hidden rounded-md border border-slate-700/50 ${canvasWidth}`}
        style={{
          fontFamily: websiteJSON.theme.fontFamily,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-slate-400 border-2 border-dashed border-slate-200 m-8 rounded-lg">
                <p>Drag sections here to start building</p>
              </div>
            ) : (
              sections.map((section) => (
                <SectionRenderer key={section.id} section={section} theme={websiteJSON.theme} />
              ))
            )}
          </SortableContext>

          <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.5" } } }) }}>
            {activeDragType ? (
              <div className="w-full bg-blue-100/80 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center p-8 shadow-lg text-blue-700 font-bold uppercase tracking-widest backdrop-blur-sm">
                Drop {activeDragType} here
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
