import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      theme: 'light', // 'light' or 'dark'
      lang: 'uk', // 'uk' or 'en'
      alertModal: { isOpen: false, title: '', message: '' },
      showAlert: (title, message) => set({ alertModal: { isOpen: true, title, message } }),
      closeAlert: () => set({ alertModal: { isOpen: false, title: '', message: '' } }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((state) => ({ lang: state.lang === 'uk' ? 'en' : 'uk' })),
    }),
    {
      name: 'weather-app-settings',
    }
  )
);
