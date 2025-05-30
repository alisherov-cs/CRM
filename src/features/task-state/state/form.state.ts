import { create } from "zustand";
import { TTaskState } from "../api/get-all-taskStates.request";

interface TaskStatesFormState {
  open: boolean;
  data: TTaskState | null;
  onOpen: (data?: TTaskState) => void;
  onClose: () => void;
}

export const useTaskStatesFormState = create<TaskStatesFormState>((set) => ({
  open: false,
  data: null,
  onOpen: (data) => set({ open: true, data: data || null }),
  onClose: () => set({ open: false, data: null }),
}));
