import create, { SetState } from "zustand";

import Skill from "../../../types/Skill";

interface SkillListState {
  skills: Array<Skill> | null;
  setSkills: any;
  addSkill: any;
  removeSkill: any;
}

const [useStore] = create((set: SetState<SkillListState>) => ({
  skills: null,
  setSkills: (skills: Array<Skill>) =>
    set(() => ({
      skills,
    })),
  addSkill: (skill: Skill) =>
    set((state) => ({
      skills: state.skills.concat(skill),
    })),
  removeSkill: (skill: Skill) =>
    set((state) => ({
      skills: state.skills.filter((item: Skill) => item.id !== skill.id),
    })),
}));

export default useStore;
