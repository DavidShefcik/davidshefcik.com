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
import FormDropdown from "../../../../../components/FormDropdown";
import FormButton from "../../../../../components/FormButton";

import replaceWhitespace from "../../../../../util/replaceWhitespace";
import validLink from "../../../../../util/validLink";

import useFirebase from "../../../../../store/Firebase";

import useAddProject from "../../../../../store/dashboard/Projects/AddProject";

import useAddProjectErrors from "../../../../../store/dashboard/Projects/AddProjectErrors";

import useProjectList from "../../../../../store/dashboard/Projects/ProjectList";

import Project from "../../../../../types/Project";

interface Props {
  close: Dispatch<SetStateAction<boolean>>;
}

export default function AddProject({ close }: Props): ReactElement {
  const addProjectValues = useAddProject((state) => state.values);
  const setProjectValue = useAddProject((state) => state.setValue);
  const clearProjectValues = useAddProject((state) => state.clearValues);

  const addProjectErrorValues = useAddProjectErrors((state) => state.values);
  const setAddProjectErrorValue = useAddProjectErrors(
    (state) => state.setValue
  );
  const clearProjectErrorValues = useAddProjectErrors(
    (state) => state.clearValues
  );

  const addProjectList = useProjectList((state) => state.addProject);

  const [nameValue, setNameValue] = useState(addProjectValues.name);
  const [descriptionValue, setDescriptionValue] = useState(
    addProjectValues.description
  );
  const [openSourceValue, setOpenSourceValue] = useState(
    addProjectValues.openSource
  );
  const [githubValue, setGithubValue] = useState(addProjectValues.github);
  const [liveValue, setLiveValue] = useState(addProjectValues.live);
  const [liveLinkValue, setLiveLinkValue] = useState(addProjectValues.liveLink);
  const [techValue, setTechValue] = useState(addProjectValues.tech);

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(addProjectErrorValues.name);
  const [descriptionError, setDescriptionError] = useState(
    addProjectErrorValues.description
  );
  const [openSourceError, setOpenSourceError] = useState(
    addProjectErrorValues.openSource
  );
  const [githubError, setGithubError] = useState(addProjectErrorValues.github);
  const [liveError, setLiveError] = useState(addProjectErrorValues.live);
  const [liveLinkError, setLiveLinkError] = useState(
    addProjectErrorValues.liveLink
  );
  const [techError, setTechError] = useState(addProjectErrorValues.tech);
  const [errorText, setErrorText] = useState(addProjectErrorValues.text);

  const firebase = useFirebase((state) => state.firebase);

  const db = firebase.firestore();

  async function submit(): Promise<boolean> {
    let hasError = false;

    setLoading(true);
    setNameError(false);
    setDescriptionError(false);
    setOpenSourceError(false);
    setGithubError(false);
    setLiveError(false);
    setLiveLinkError(false);
    setTechError(false);
    setErrorText("");

    const name = replaceWhitespace(nameValue, " ");
    const description = replaceWhitespace(descriptionValue, " ");
    const githubLink = replaceWhitespace(githubValue, " ");
    const liveLink = replaceWhitespace(liveLinkValue, " ");
    const tech = replaceWhitespace(techValue.toString(), " ");
    const isOpenSource = replaceWhitespace(openSourceValue, " ");
    const isLive = replaceWhitespace(liveValue, " ");

    // Whitespace check
    if (replaceWhitespace(name, "").length === 0) {
      setNameError(true);
      hasError = true;
    }
    if (replaceWhitespace(description, "").length === 0) {
      setDescriptionError(true);
      hasError = true;
    }
    if (replaceWhitespace(tech, "").length === 0) {
      setTechError(true);
      hasError = true;
    }

    // Dropdown check
    if (isOpenSource === "none") {
      setOpenSourceError(true);
      hasError = true;
    }
    if (isLive === "none") {
      setLiveError(true);
      hasError = true;
    }

    // Whitespace check on optional values
    if (isOpenSource === "true") {
      if (replaceWhitespace(githubLink, "").length === 0) {
        setGithubError(true);
        hasError = true;
      }
    }
    if (isLive === "true") {
      if (replaceWhitespace(liveLink, "").length === 0) {
        setLiveLinkError(true);
        hasError = true;
      }
    }

    if (hasError) {
      setErrorText("Invalid values!");
    }

    if (!hasError) {
      // Check valid links
      if (isOpenSource === "true") {
        if (!validLink(githubLink)) {
          setGithubError(true);
          hasError = true;
        }
      }
      if (isLive === "true") {
        if (!validLink(liveLink)) {
          setLiveLinkError(true);
          hasError = true;
        }
      }

      if (hasError) {
        setErrorText("Invalid links!");
      }
    }

    if (!hasError) {
      // Check if project with name already exists in database
      try {
        const docs = await db.collection("projects").get();
        docs.forEach((doc: any) => {
          const docName = doc.data().name;
          if (docName.toUpperCase() === nameValue.toUpperCase()) {
            hasError = true;
            setErrorText("Name is already in use!");
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
        const tech = techValue.toString().split(", ");

        const projectForDB: Project = {
          name: nameValue,
          description: descriptionValue,
          openSource: openSourceValue,
          githubLink: githubValue,
          live: liveValue,
          liveLink: liveLinkValue,
          tech,
        };

        try {
          const newDoc = await db.collection("projects").add(projectForDB);
          clearProjectValues();
          clearProjectErrorValues();
          addProjectList(newDoc);
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
    setProjectValue("name", nameValue);
  }, [nameValue]);

  useEffect(() => {
    setProjectValue("description", descriptionValue);
  }, [descriptionValue]);

  useEffect(() => {
    setProjectValue("openSource", openSourceValue);
  }, [openSourceValue]);

  useEffect(() => {
    setProjectValue("github", githubValue);
  }, [githubValue]);

  useEffect(() => {
    setProjectValue("live", liveValue);
  }, [liveValue]);

  useEffect(() => {
    setProjectValue("liveLink", liveLinkValue);
  }, [liveLinkValue]);

  useEffect(() => {
    setProjectValue("tech", techValue);
  }, [techValue]);

  // Errors
  useEffect(() => {
    setAddProjectErrorValue("name", nameError);
  }, [nameError]);

  useEffect(() => {
    setAddProjectErrorValue("description", descriptionError);
  }, [descriptionError]);

  useEffect(() => {
    setAddProjectErrorValue("openSource", openSourceError);
  }, [openSourceError]);

  useEffect(() => {
    setAddProjectErrorValue("github", githubError);
  }, [githubError]);

  useEffect(() => {
    setAddProjectErrorValue("live", liveError);
  }, [liveError]);

  useEffect(() => {
    setAddProjectErrorValue("liveLink", liveLinkError);
  }, [liveLinkError]);

  useEffect(() => {
    setAddProjectErrorValue("tech", techError);
  }, [techError]);

  useEffect(() => {
    setAddProjectErrorValue("text", errorText);
  }, [errorText]);

  return (
    <div className="w-full h-auto p-4 flex items-center justify-center flex-col">
      <div className="w-full flex flex-col items-end justify-center px-10 py-2">
        <MdDelete
          size={32}
          className="text-red-600 hover:text-red-700 cursor-pointer transition ease-in duration-75"
          title="Cancel"
          onClick={() => {
            close(false);
            clearProjectValues();
            clearProjectErrorValues();
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
      <FormInput
        type="text"
        placeholder="Description"
        maxLength={1024}
        onChange={setDescriptionValue}
        value={descriptionValue}
        error={descriptionError}
      />
      <FormDropdown
        defaultValue={{
          text: "Source Type",
          value: "none",
        }}
        values={[
          {
            text: "Open Source",
            value: true,
          },
          {
            text: "Closed Source",
            value: false,
          },
        ]}
        onChange={setOpenSourceValue}
        error={openSourceError}
      />
      {openSourceValue === "true" ? (
        <FormInput
          type="text"
          placeholder="GitHub Repository"
          maxLength={128}
          onChange={setGithubValue}
          value={githubValue}
          error={githubError}
        />
      ) : null}
      <FormDropdown
        defaultValue={{
          text: "Is Online",
          value: "none",
        }}
        values={[
          {
            text: "Online",
            value: true,
          },
          {
            text: "Offline",
            value: false,
          },
        ]}
        onChange={setLiveValue}
        error={liveError}
      />
      {liveValue === "true" ? (
        <FormInput
          type="text"
          placeholder="Live Link"
          maxLength={128}
          onChange={setLiveLinkValue}
          value={liveLinkValue}
          error={liveLinkError}
        />
      ) : null}
      <FormInput
        type="text"
        placeholder="Technologies (Seperated by ', ')"
        maxLength={1024}
        onChange={setTechValue}
        value={techValue}
        error={techError}
      />
      {errorText !== "" ? (
        <p className="py-2 text-red-600">{errorText}</p>
      ) : null}
      <FormButton text="Add Project" loading={loading} click={submit} />
    </div>
  );
}
