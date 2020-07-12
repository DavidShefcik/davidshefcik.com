import React, { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <div className="bg-secondary-background w-full p-4 flex flex-row justify-center items-center">
      <span className="px-1">
        <a
          href="https://github.com/DavidShefcik"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-gray-200 hover:text-gray-100">GitHub</p>
        </a>
      </span>
      <span className="px-1">
        <a
          href="https://www.linkedin.com/in/davidshefcik/"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-gray-200 hover:text-gray-100">LinkedIn</p>
        </a>
      </span>
    </div>
  );
}
