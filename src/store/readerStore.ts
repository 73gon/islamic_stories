import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FontSize = 'small' | 'medium' | 'large';
type FontFamily = 'sans' | 'serif';

interface ReaderState {
  focusMode: boolean;
  fontSize: FontSize;
  fontFamily: FontFamily;
  toggleFocusMode: () => void;
  setFontSize: (size: FontSize) => void;
  setFontFamily: (family: FontFamily) => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      focusMode: false,
      fontSize: 'medium',
      fontFamily: 'sans',
      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
      setFontSize: (size) => set({ fontSize: size }),
      setFontFamily: (family) => set({ fontFamily: family }),
    }),
    {
      name: 'reader-preferences',
    },
  ),
);
