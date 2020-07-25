import React, { ReactElement, useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { MdRefresh } from "react-icons/md";
import "firebase/firestore";

import DashboardItemList from "../../../../components/DashboardItemList";

import AddSkill from "./AddSkill";
import Skill from "./Skill";

import ConfirmModal from "../../../../layout/Modals/ConfirmModal";

import SkillType from "../../../../types/Skill";

import useFirebase from "../../../../store/Firebase";

import useSkillList from "../../../../store/dashboard/Skills/SkillList";

import useAddSkill from "../../../../store/dashboard/Skills/AddSkill";

import useDeleteSkillModal from "../../../../store/modals/DeleteSkillModal";

import useSession from "../../../../store/Session";

export default function Skills(): ReactElement {
  const skillList = useSkillList((state) => state.skills);
  const setSkillList = useSkillList((state) => state.setSkills);

  const addSkillVisible = useAddSkill((state) => state.visible);
  const setAddSkillVisible = useAddSkill((state) => state.setVisible);

  const loggedIn = useSession((state) => state.session.loggedIn);

  const [status, setStatus] = useState("loading");
  const [skills, setSkills] = useState<Array<SkillType>>(skillList);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteSkillModalVisible = useDeleteSkillModal((state) => state.visible);
  const setDeleteSkillModalVisible = useDeleteSkillModal(
    (state) => state.setVisible
  );
  const deleteSkillInfo = useDeleteSkillModal((state) => state.skillInfo);

  const firebase = useFirebase((state) => state.firebase);

  const db = firebase.firestore();

  async function getSkills() {
    const skillsFromDB: Array<SkillType> = [];

    try {
      const skillsList = await db.collection("skills").get();
      skillsList.docs.forEach((doc: any) => {
        const skill = doc.data();
        skill.id = doc.id;
        skillsFromDB.push(skill);
      });
      setStatus("success");
      setSkills(skillsFromDB);
    } catch (error) {
      if (process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      setStatus("error");
    }
  }

  // This one is not async because of an issue with the modal unmounting too early
  function deleteSkill(): void {
    setDeleteLoading(true);

    if (deleteSkillInfo.skillID !== "") {
      db.collection("skills")
        .doc(deleteSkillInfo.skillID)
        .delete()
        .then(() => {
          setDeleteSkillModalVisible(false);
          getSkills();
        })
        .catch((error: any) => {
          if (process.env.NODE_ENV === "dev") {
            console.log(error);
          }
        });
    }

    setDeleteLoading(false);
  }

  useEffect(() => {
    if (loggedIn && skillList === null) {
      getSkills();
    } else if (loggedIn && skillList !== null) {
      setStatus("success");
      setSkills(skillList);
    }
  }, [loggedIn]);

  useEffect(() => {
    setSkillList(skills);
  }, [skills]);

  return (
    <>
      <ConfirmModal
        title="Delete Skill?"
        text={`Are you sure you want to delete skill "${deleteSkillInfo.skillName}"?`}
        isVisible={deleteSkillModalVisible}
        closeModal={() => {
          setDeleteLoading(false);
          setDeleteSkillModalVisible(false);
        }}
        onConfirm={() => deleteSkill()}
        loading={deleteLoading}
      />
      <div className="flex w-full h-full flex-col items-center py-4">
        {status !== "loading" ? (
          <div className="w-full flex items-center justify-end">
            <MdRefresh
              size={24}
              className="text-gray-200 hover:text-gray-400 m-3 mt-0 cursor-pointer transition ease-in duration-75"
              title="Reload"
              onClick={() => getSkills()}
            />
          </div>
        ) : null}
        {status === "loading" ? (
          <BarLoader color="white" width={152} />
        ) : status === "error" ? (
          <p className="py-2 text-red-600">
            Something happened! Please try again!
          </p>
        ) : (
          <DashboardItemList
            items={skills}
            addItem={AddSkill}
            listItem={Skill}
            showAddItem={addSkillVisible}
            setShowAddItem={setAddSkillVisible}
          />
        )}
      </div>
    </>
  );
}
