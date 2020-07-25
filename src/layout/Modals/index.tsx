import React, {
  ReactElement,
  ReactChild,
  useEffect,
  createRef,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { MdClose } from "react-icons/md";

interface Props {
  visible: boolean;
  close: any;
  children: ReactChild;
}

export default function Modal({
  visible,
  close,
  children,
}: Props): ReactElement {
  const modalContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    if (visible) {
      modalContainer.current.classList.remove("hidden");
      modalContainer.current.classList.add("opacity-100");
      modalContainer.current.classList.remove("opacity-0");
      modalContainer.current.classList.add("flex");
    } else {
      modalContainer.current.classList.remove("opacity-100");
      modalContainer.current.classList.add("opacity-0");
      setTimeout(() => {
        if (
          modalContainer.current !== null &&
          modalContainer.current.classList.contains("flex")
        ) {
          modalContainer.current.classList.remove("flex");
          modalContainer.current.classList.add("hidden");
        }
      }, 100);
    }
  }, [visible]);

  function closeModal(): void {
    close();
  }

  const modalBackgroundClick = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.target.dataset.id === "modal-background") {
      closeModal();
    }
  };

  return (
    <div
      ref={modalContainer}
      data-id="modal-background"
      onClick={modalBackgroundClick}
      className="fixed z-50 w-screen h-screen left-0 top-0 hidden flex-col justify-center items-center opacity-0 bg-black bg-opacity-75 overflow-hidden transition ease-in duration-100"
    >
      <div className="absolute top-0 right-0 p-4">
        <MdClose
          size={42}
          className="text-gray-200 hover:text-gray-400 mx-0 lg:mx-3 cursor-pointer transition ease-in duration-75"
          title="Close"
          onClick={() => closeModal()}
        />
      </div>
      <div className="w-3/4 lg:w-1/3 flex flex-col justify-center items-center h-auto bg-primary-background rounded-sm shadow">
        {children}
      </div>
    </div>
  );
}
