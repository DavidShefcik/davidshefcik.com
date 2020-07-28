import React, { ReactElement, Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";

import ConfirmModal from "../../../layout/Modals/ConfirmModal";

import SectionButton from "../../../components/SectionButton";

import SectionButtonType from "../../../types/SectionButton";
import sectionButtons from "../../../values/sectionButtons";

import useFirebase from "../../../store/Firebase";

import useConfirmLogoutModal from "../../../store/modals/ConfirmLogoutModal";

interface Props {
  currentSection: string;
  click: Dispatch<SetStateAction<string>>;
}

export default function SectionList({
  currentSection,
  click,
}: Props): ReactElement {
  const confirmLogoutModalVisible = useConfirmLogoutModal(
    (state) => state.visible
  );
  const setConfirmLogoutModalVisible = useConfirmLogoutModal(
    (state) => state.setVisible
  );

  const history = useHistory();

  const firebase = useFirebase((state) => state.firebase);

  const [logoutLoading, setLogoutLoading] = useState(false);

  function logout(): void {
    setLogoutLoading(true);

    firebase
      .auth()
      .signOut()
      .then(() => {
        setConfirmLogoutModalVisible(false);
        setLogoutLoading(false);
        history.push("/");
      })
      .catch((error: any) => {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        setLogoutLoading(false);
      });
  }

  return (
    <div className="w-full flex flex-col items-center">
      <ConfirmModal
        title="Logout?"
        text="Are you sure you want to logout?"
        loading={logoutLoading}
        isVisible={confirmLogoutModalVisible}
        onConfirm={logout}
        closeModal={() => setConfirmLogoutModalVisible(false)}
      />
      {sectionButtons.map((button: SectionButtonType) => {
        return (
          <SectionButton
            text={button.text}
            click={() => click(button.sectionName)}
            current={currentSection === button.sectionName}
            key={button.text}
          />
        );
      })}
      <SectionButton
        text="Logout"
        click={() => setConfirmLogoutModalVisible(true)}
        current={false}
      />
    </div>
  );
}
