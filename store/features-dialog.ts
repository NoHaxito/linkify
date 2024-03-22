import { create } from "zustand";

type FeaturesDialog = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useFeaturesDialog = create<FeaturesDialog>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
