import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import emojiImage from "./media/emoji.png";

export default function Catch(): ReactElement {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <img src={emojiImage} alt="" />
      <div className="pt-8 flex items-center flex-col">
        <p className="text-2xl text-white pb-4">Well, this is awkward.</p>
        <p className="text-gray-300 text-center">
          The page you were looking for was not found!
        </p>
        <Link to="/" title="Back to Safety">
          <div className="my-10 bg-green-500 hover:bg-green-600 transition ease-in duration-100 w-32 py-2 flex justify-center items-center rounded-sm">
            <p className="text-white">Back to Safety</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
