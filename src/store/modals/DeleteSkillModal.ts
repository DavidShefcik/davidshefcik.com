import create, { SetState } from "zustand";

interface SkillInfo {
  skillID: string;
  skillName: string;
}

interface DeleteProjectModalState {
  visible: boolean;
  skillInfo: SkillInfo;
  setSkill: any;
  clearSkill: any;
  setVisible: any;
}

const [useStore] = create((set: SetState<DeleteProjectModalState>) => ({
  visible: false,
  skillInfo: {
    skillID: "",
    skillName: "",
  },
  setSkill: (skillID: string, skillName: string) =>
    set(() => ({
      skillInfo: {
        skillID,
        skillName,
      },
    })),
  clearSkill: () =>
    set(() => ({
      skillInfo: {
        skillID: "",
        skillName: "",
      },
    })),
  setVisible: (visible: boolean) =>
    set(() => ({
      visible,
    })),
}));

export default useStore;
