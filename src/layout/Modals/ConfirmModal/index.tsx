import React, { ReactElement } from "react";

import Modal from "../index";
import OptionButton, { ButtonType } from "../../../components/OptionButton";

interface Props {
  title: string;
  text: string;
  isVisible: boolean;
  onConfirm: any;
  closeModal: any;
  loading: boolean;
}

export default function ConfirmModal({
  title,
  text,
  isVisible,
  onConfirm,
  closeModal,
  loading,
}: Props): ReactElement {
  return (
    <Modal visible={isVisible} close={closeModal}>
      <>
        <div className="w-full py-4 px-6 border-solid border-b border-gray-200">
          <p className="text-lg text-gray-100">{title}</p>
        </div>
        <div className="w-full p-6">
          <p className="text text-gray-200 text-center">{text}</p>
        </div>
        <div className="w-full flex flew-col justify-center bg-darker-primary-background py-3 px-4">
          <div className="w-full lg:w-3/4 flex flex-row justify-center items-center self-end">
            <OptionButton
              text="Cancel"
              type={ButtonType.CANCEL}
              click={() => closeModal()}
              loading={false}
            />
            <OptionButton
              text="Ok"
              type={ButtonType.OK}
              click={() => onConfirm()}
              loading={loading}
            />
          </div>
        </div>
      </>
    </Modal>
  );
}
