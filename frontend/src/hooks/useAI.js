import { useContext } from 'react';
import { AIContext } from '../context/AIContext';

export function useAI() {
  return useContext(AIContext);
}
