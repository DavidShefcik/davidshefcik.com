import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

import FormButton from "../../components/FormButton";

import emojiImage from "./media/emoji.png";

export default function Catch(): ReactElement {
  const history = useHistory();

  return (
    <div className="page-contents-height w-full flex justify-center items-center flex-col">
      <img src={emojiImage} alt="" />
      <div className="pt-8 w-full flex items-center flex-col">
        <p className="text-2xl text-white pb-4">Well, this is awkward.</p>
        <p className="text-gray-300 text-center">
          The page you were looking for was not found!
        </p>
        <div className="py-4 w-full flex flex-row justify-center items-center">
          <FormButton
            text="Back to Safety"
            click={() => history.push("/")}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
