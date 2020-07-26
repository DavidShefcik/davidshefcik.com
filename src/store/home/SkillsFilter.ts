/* Creating a seperate store instead of reusing the dashboard store to keep them in seperate places in memory */

import create, { SetState } from "zustand";

import Skill from "../../types/Skill";

interface FilteredSkillListState {
  filteredSkills: Array<Skill>;
  filterQuery: string;
  setFilteredSkills: any;
  addFilteredSkill: any;
  removeFilteredSkill: any;
  setFilterQuery: any;
}

const [useStore] = create((set: SetState<FilteredSkillListState>) => ({
  filteredSkills: [],
  filterQuery: "",
  setFilteredSkills: (skills: Array<Skill>) =>
    set(() => ({
      filteredSkills: skills,
    })),
  addFilteredSkill: (skill: Skill) =>
    set((state) => ({
      filteredSkills: state.filteredSkills.concat(skill),
    })),
  removeFilteredSkill: (skill: Skill) =>
    set((state) => ({
      filteredSkills: state.filteredSkills.filter(
        (item: Skill) => item.id !== skill.id
      ),
    })),
  setFilterQuery: (filterQuery: string) =>
    set(() => ({
      filterQuery,
    })),
  clearFilterQuery: () =>
    set(() => ({
      filterQuery: "",
    })),
}));

export default useStore;
