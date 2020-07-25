import React, { ReactElement } from "react";
import { MdDelete } from "react-icons/md";

import useDeleteSkillModal from "../../../../../store/modals/DeleteSkillModal";

interface Props {
  id: string;
  name: string;
  even: boolean;
}

export default function Skill({ id, name, even }: Props): ReactElement {
  const setDeleteProjectModalVisible = useDeleteSkillModal(
    (state) => state.setVisible
  );
  const setSkillModal = useDeleteSkillModal((state) => state.setSkill);

  return (
    <div
      className={`w-full h-auto px-1 py-2 flex flex-row justify-start items-center ${
        even ? "bg-darker-primary-background" : ""
      }`}
    >
      <div className="w-3/4 flex flex-col justify-center items-start">
        <p className="py-2 px-2 w-full overflow-hidden text-lg text-white">
          {name}
        </p>
      </div>
      <div className="w-1/4 flex flex-row justify-center items-center">
        <MdDelete
          size={24}
          className="text-red-600 hover:text-red-700 mx-1 lg:mx-3 cursor-pointer transition ease-in duration-75"
          title="Delete"
          onClick={() => {
            setSkillModal(id, name);
            setDeleteProjectModalVisible(true);
          }}
        />
      </div>
    </div>
  );
}
