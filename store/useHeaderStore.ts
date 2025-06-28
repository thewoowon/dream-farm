import { create } from "zustand";

type HeaderStore = {
  display: "none" | "block";
  change: (value: "none" | "block") => void;
};

const useHeaderStore = create<HeaderStore>((set) => ({
  display: "block",
  change: (value) => set({ display: value || "none" }),
}));

export default useHeaderStore;
