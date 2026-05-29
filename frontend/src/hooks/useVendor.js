import { useContext } from 'react';
import { VendorContext } from '../context/VendorContext';

export function useVendor() {
  return useContext(VendorContext);
}
