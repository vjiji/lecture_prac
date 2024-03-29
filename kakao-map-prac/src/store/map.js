import { create } from "zustand";

const useMapStore = create((set) => ({
  markers: [],
  setMarker: (point) =>
    set((state) => (state.markers = [...state.markers, point])),
}));
export default useMapStore;
