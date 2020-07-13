import React, { ReactElement } from "react";
import ReactSwitch from "react-switch";

import useViewType, { ViewTypes } from "../../store/ViewType";

export default function ViewTypeSwitch(): ReactElement {
  const viewType = useViewType((state) => state.type);
  const setViewType = useViewType((state) => state.setType);

  return (
    <div className="fixed z-50 flex flex-row justify-center items-center bottom-0 right-0 mx-2 my-2 p-2 bg-secondary-background shadow rounded-sm">
      <p className="px-2 text-gray-100 text-lg">GUI</p>
      <ReactSwitch
        onChange={() =>
          setViewType(
            viewType === ViewTypes.GUI ? ViewTypes.TERMINAL : ViewTypes.GUI
          )
        }
        checked={viewType === ViewTypes.TERMINAL}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={45}
        handleDiameter={25}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        onColor="#86d3ff"
        onHandleColor="#2693e6"
      />
      <p className="px-2 text-gray-100 text-lg">Terminal</p>
    </div>
  );
}
