import React, { ReactElement } from "react";
import { MdDelete } from "react-icons/md";

import useDeleteProjectModal from "../../../../../store/modals/DeleteProjectModal";

interface Props {
  id: string;
  name: string;
  description: string;
  openSource: string;
  githubLink: string;
  live: string;
  liveLink: string;
  tech: Array<string>;
  even: boolean;
}

export default function Project({
  id,
  name,
  description,
  openSource,
  live,
  even,
}: Props): ReactElement {
  const setDeleteProjectModalVisible = useDeleteProjectModal(
    (state) => state.setVisible
  );
  const setProjectModal = useDeleteProjectModal((state) => state.setProject);

  return (
    <div
      className={`w-full h-auto px-1 py-2 flex flex-row justify-start items-center ${
        even ? "bg-darker-primary-background" : ""
      }`}
    >
      <div className="w-3/4 flex flex-col justify-center items-start">
        <p className="pb-0 lg:pb-2 px-2 w-full overflow-hidden text-lg text-white">
          {name}
        </p>
        <p className="w-full px-4 overflow-hidden hidden lg:flex text-gray-500 text-sm">
          {description} -{" "}
          {openSource === "false" ? "Closed Source" : "Open Source"} -{" "}
          {live === "false" ? "Offline" : "Online"}
        </p>
      </div>
      <div className="w-1/4 flex flex-row justify-center items-center">
        <MdDelete
          size={24}
          className="text-red-600 hover:text-red-700 mx-1 lg:mx-3 cursor-pointer transition ease-in duration-75"
          title="Delete"
          onClick={() => {
            setProjectModal(id, name);
            setDeleteProjectModalVisible(true);
          }}
        />
      </div>
    </div>
  );
}
