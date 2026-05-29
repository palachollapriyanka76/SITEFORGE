import React, { createContext, useState } from 'react';

export const VendorContext = createContext(null);

export function VendorProvider({ children }) {
  const [vendorData, setVendorData] = useState(null);
  return (
    <VendorContext.Provider value={{ vendorData, setVendorData }}>
      {children}
    </VendorContext.Provider>
  );
}
