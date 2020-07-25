import React, {
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { MdDelete } from "react-icons/md";
import "firebase/firestore";

import FormInput from "../../../../../components/FormInput";
import FormButton from "../../../../../components/FormButton";

import Skill from "../../../../../types/Skill";

import replaceWhitespace from "../../../../../util/replaceWhitespace";

import useFirebase from "../../../../../store/Firebase";

import useAddSkill from "../../../../../store/dashboard/Skills/AddSkill";

import useAddSkillErrors from "../../../../../store/dashboard/Skills/AddSkillErrors";

import useSkillList from "../../../../../store/dashboard/Skills/SkillList";

interface Props {
  close: Dispatch<SetStateAction<boolean>>;
}

export default function AddSkill({ close }: Props): ReactElement {
  const addSkillName = useAddSkill((state) => state.skillName);
  const setSkillName = useAddSkill((state) => state.setSkillName);

  const setAddSkillErrorText = useAddSkillErrors((state) => state.setErrorText);
  const setAddSkillHasError = useAddSkillErrors((state) => state.setHasError);
  const clearSkillError = useAddSkillErrors((state) => state.clearError);
  const addSkillHasError = useAddSkillErrors((state) => state.hasError);
  const addSkillErrorText = useAddSkillErrors((state) => state.errorText);

  const addSkillList = useSkillList((state) => state.addSkill);

  const [nameValue, setNameValue] = useState(addSkillName);

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(addSkillHasError);

  const [errorText, setErrorText] = useState(addSkillErrorText);

  const firebase = useFirebase((state) => state.firebase);

  const db = firebase.firestore();

  async function submit(): Promise<boolean> {
    let hasError = false;

    setLoading(true);
    setNameError(false);
    setErrorText("");

    const name = replaceWhitespace(nameValue, " ");

    // Whitespace check
    if (replaceWhitespace(name, "").length === 0) {
      setNameError(true);
      hasError = true;
    }

    if (hasError) {
      setErrorText("Invalid values!");
    }

    if (!hasError) {
      // Check if skill with name already exists in database
      try {
        const docs = await db.collection("skills").get();
        docs.forEach((doc: any) => {
          const docName = doc.data().name;
          if (docName.toUpperCase() === nameValue.toUpperCase()) {
            hasError = true;
            setErrorText("Skill already exists!");
            setNameError(true);
          }
        });
      } catch (error) {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        hasError = true;
        setErrorText("Something happened! Please try again!");
      }

      if (!hasError) {
        const skillForDB: Skill = {
          name: nameValue,
        };

        try {
          const newDoc = await db.collection("skills").add(skillForDB);
          setSkillName("");
          clearSkillError();
          addSkillList(newDoc);
          setLoading(false);
          close(false);
        } catch (error) {
          if (process.env.NODE_ENV === "dev") {
            console.log(error);
          }
          hasError = true;
          setErrorText("Something happened! Please try again!");
          setLoading(false);
        }
      }
    }

    return true;
  }

  // Inputs
  useEffect(() => {
    setSkillName(nameValue);
  }, [nameValue]);

  useEffect(() => {
    setAddSkillHasError(nameError);
  }, [nameError]);

  useEffect(() => {
    setAddSkillErrorText(errorText);
  }, [errorText]);

  return (
    <div className="w-full h-auto p-4 flex items-center justify-center flex-col">
      <div className="w-full flex flex-col items-end justify-center px-10 py-2">
        <MdDelete
          size={32}
          className="text-red-600 hover:text-red-700 cursor-pointer transition ease-in duration-75"
          title="Cancel"
          onClick={() => {
            setSkillName("");
            clearSkillError();
            close(false);
          }}
        />
      </div>
      <FormInput
        type="text"
        placeholder="Name"
        maxLength={64}
        onChange={setNameValue}
        value={nameValue}
        error={nameError}
      />
      {errorText !== "" ? (
        <p className="py-2 text-red-600">{errorText}</p>
      ) : null}
      <FormButton text="Add Project" loading={loading} click={submit} />
    </div>
  );
}
