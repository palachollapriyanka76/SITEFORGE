import React, { createContext, useState } from 'react';

export const AIContext = createContext(null);

export function AIProvider({ children }) {
  const [aiState, setAiState] = useState(null);
  return (
    <AIContext.Provider value={{ aiState, setAiState }}>
      {children}
    </AIContext.Provider>
  );
}
