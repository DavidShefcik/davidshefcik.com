import React, { ReactElement } from "react";
import { PulseLoader } from "react-spinners";

enum ButtonType {
  CANCEL = "CANCEL",
  OK = "OK",
}

interface Props {
  text: string;
  type: ButtonType;
  click: any;
  loading: boolean;
}

export default function OptionButton({
  text,
  type,
  click,
  loading,
}: Props): ReactElement {
  return (
    <div
      className={`w-1/2 lg:w-2/4 xl:w-1/4 flex flex-row justify-center items-center mx-3 px-3 py-2 cursor-pointer transition ease-in duration-75 rounded-sm ${
        type === ButtonType.OK
          ? "bg-green-600 hover:bg-green-700"
          : "bg-red-600 hover:bg-red-700"
      }`}
      title={text}
      onClick={() => click()}
    >
      {loading ? (
        <PulseLoader color="white" size={8} />
      ) : (
        <p className="text-gray-200">{text}</p>
      )}
    </div>
  );
}

export { ButtonType };
