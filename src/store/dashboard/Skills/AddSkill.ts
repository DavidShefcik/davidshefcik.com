import create, { SetState, GetState } from "zustand";

interface AddSkillState {
  skillName: string;
  visible: boolean;
  setSkillName: any;
  setVisible: any;
}

const [useStore] = create((set: SetState<AddSkillState>) => ({
  skillName: "",
  visible: false,
  setSkillName: (name: string) => {
    set(() => ({
      skillName: name,
    }));
  },
  setVisible: (visible: boolean) =>
    set(() => ({
      visible,
    })),
}));

export default useStore;
