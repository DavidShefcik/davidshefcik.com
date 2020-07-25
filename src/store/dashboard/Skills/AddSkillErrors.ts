import create, { SetState } from "zustand";
import { devtools } from "zustand/middleware";

interface AddSkillErrorsState {
  hasError: boolean;
  errorText: string;
  setHasError: any;
  setErrorText: any;
  clearError: any;
}

const [useStore] = create(
  devtools((set: SetState<AddSkillErrorsState>) => ({
    hasError: false,
    errorText: "",
    setHasError: (hasError: boolean) =>
      set(() => ({
        hasError,
      })),
    setErrorText: (text: string) =>
      set(() => ({
        errorText: text,
      })),
    clearError: () =>
      set(() => ({
        hasError: false,
        errorText: "",
      })),
  }))
);

export default useStore;
