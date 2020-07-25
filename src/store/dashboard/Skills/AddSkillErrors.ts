import create, { SetState } from "zustand";

interface AddSkillErrorsState {
  hasError: boolean;
  errorText: string;
  setError: any;
  clearError: any;
}

const [useStore] = create((set: SetState<AddSkillErrorsState>) => ({
  hasError: false,
  errorText: "",
  setError: (text: string) =>
    set(() => ({
      hasError: true,
      errorText: text,
    })),
  clearError: () =>
    set(() => ({
      hasError: false,
      errorText: "",
    })),
}));

export default useStore;
