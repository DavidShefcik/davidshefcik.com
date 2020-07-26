import React, { ReactElement, useEffect, useState } from "react";
import "firebase/firestore";

import SkillType from "../../../../types/Skill";

import HomeSection from "../../../../components/HomeSection";

import FormInput from "../../../../components/FormInput";

import Skill from "./Skill";

import useFirebase from "../../../../store/Firebase";

import useSkills from "../../../../store/home/Skills";

import useSkillsFilter from "../../../../store/home/SkillsFilter";

import replaceWhitespace from "../../../../util/replaceWhitespace";

export default function Skills(): ReactElement {
  const skillList = useSkills((state) => state.skills);
  const setSkillList = useSkills((state) => state.setSkills);

  const filteredSkillList = useSkillsFilter((state) => state.filteredSkills);
  const fillteredQuery = useSkillsFilter((state) => state.filterQuery);
  const setFilterQuery = useSkillsFilter((state) => state.setFilterQuery);
  const setFilteredSkillList = useSkillsFilter(
    (state) => state.setFilteredSkills
  );

  const firebase = useFirebase((state) => state.firebase);

  const [skills, setSkills] = useState<Array<SkillType>>([]);
  const [filteredSkills, setFilteredSkills] = useState<Array<SkillType>>([]);
  const [status, setStatus] = useState("loading");

  const [filterValue, setFilterValue] = useState(fillteredQuery);

  const db = firebase.firestore();

  async function getSkills(): Promise<boolean> {
    try {
      const skillsFromDB: Array<SkillType> = [];

      const skillsList = await db.collection("skills").get();
      skillsList.docs.forEach((doc: any) => {
        const skill = doc.data();
        skill.id = doc.id;
        skillsFromDB.push(skill);
      });
      setSkills(skillsFromDB);
      setFilteredSkills(skillsFromDB);
      setStatus("success");
    } catch (error) {
      if (process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      setStatus("error");
    }

    return true;
  }

  useEffect(() => {
    if (skillList === null) {
      getSkills();
    } else {
      setSkills(skillList);
      setFilteredSkills(skillList);
      setStatus("success");
    }
  }, []);

  useEffect(() => {
    setSkillList(skills);
    setFilteredSkills(skills);
  }, [skills]);

  useEffect(() => {
    setFilteredSkillList(filteredSkillList);
  }, [filteredSkills]);

  useEffect(() => {
    setFilterQuery(filterValue);

    if (replaceWhitespace(filterValue, "").length > 0) {
      setFilteredSkills(
        skillList.filter((skill: SkillType) =>
          skill.name.toUpperCase().includes(filterValue.toUpperCase())
        )
      );
    } else {
      setFilteredSkills(skills);
    }
  }, [filterValue]);

  return (
    <HomeSection title="Skills" status={status} growable>
      {skills.length === 0 ? (
        <p className="text-gray-100">No skills available!</p>
      ) : (
        <>
          <FormInput
            type="text"
            placeholder="Search for a skill..."
            maxLength={128}
            value={filterValue}
            onChange={setFilterValue}
          />
          <div className="w-full lg:w-2/4 bg-secondary-background h-64 overflow-auto my-4">
            {filteredSkills.length === 0 ? (
              <p className="text-gray-100 h-64 flex justify-center items-center">
                I don&apos;t have that skill but I am always willing to learn!
              </p>
            ) : (
              <>
                {filteredSkills.map((skill: SkillType, index: number) => (
                  <Skill key={skill.id} skill={skill} even={index % 2 === 0} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </HomeSection>
  );
}
