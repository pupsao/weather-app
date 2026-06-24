import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MAX_BLOCKS } from '../constants';

const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

export const useWeatherStore = create(
  persist(
    (set, get) => ({
      blocks: [{ id: generateId(), city: null }],
      
      favorites: [],

      addBlock: () => {
        const { blocks } = get();
        if (blocks.length < MAX_BLOCKS) {
          set({ blocks: [...blocks, { id: generateId(), city: null }] });
        }
      },

      removeBlock: (id) => {
        const { blocks } = get();
        if (blocks.length > 1) {
          set({ blocks: blocks.filter((b) => b.id !== id) });
        }
      },

      updateBlockCity: (id, city) => {
        set({
          blocks: get().blocks.map((b) => (b.id === id ? { ...b, city } : b)),
        });
      },

      addFavorite: (city) => {
        const { favorites } = get();
        const isExist = favorites.find((f) => f.lat === city.lat && f.lon === city.lon);
        
        if (favorites.length < MAX_BLOCKS && !isExist) {
          set({ favorites: [...favorites, city] });
          return { success: true };
        }
        
        if (isExist) {
          return { success: false, reason: 'exists' };
        }
        
        return { success: false, reason: 'limit' };
      },

      removeFavorite: (lat, lon) => {
        set({
          favorites: get().favorites.filter((f) => f.lat !== lat || f.lon !== lon),
        });
      },
    }),
    {
      name: 'weather-favorites-storage', 

      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
