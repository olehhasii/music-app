import { create } from 'zustand';

type ToastStore = {
  isToastOpened: boolean;
  message: string;
  isToastError: boolean;
  openToast: () => void;
  closeToast: () => void;
  setToastMessage: (message: string, isToastError: boolean) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  isToastOpened: false,
  message: '',
  isToastError: false,
  openToast: () => set({ isToastOpened: true }),
  closeToast: () => set({ isToastOpened: false }),
  setToastMessage: (message: string, isToastError: boolean) =>
    set({ message: message, isToastError: isToastError }),
}));
