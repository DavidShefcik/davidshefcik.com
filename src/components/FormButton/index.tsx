import React, { ReactElement } from "react";
import { PulseLoader } from "react-spinners";

interface Props {
  text: string;
  click: any;
  loading: boolean;
}

export default function FormButton({
  text,
  click,
  loading,
}: Props): ReactElement {
  return (
    <button
      type="button"
      onClick={() => click()}
      disabled={loading}
      className={`px-4 py-3 my-1 w-2/3 md:1/3 lg:w-1/4 xl:w-1/5 rounded-sm transition ease-in duration-75 focus:outline-none flex justify-center items-center ${
        loading
          ? "cursor-not-allowed bg-blue-800"
          : "cursor-pointer bg-blue-700 hover:bg-blue-800"
      }`}
    >
      {loading ? (
        <PulseLoader color="white" size={8} />
      ) : (
        <p className="text-white text">{text}</p>
      )}
    </button>
  );
}
