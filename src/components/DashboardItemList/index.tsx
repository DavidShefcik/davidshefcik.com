import React, {
  ReactElement,
  createElement,
  FunctionComponent,
  useState,
} from "react";

import FormButton from "../FormButton";

interface Props {
  items: Array<any>;
  listItem: FunctionComponent;
  addItem: FunctionComponent;
}

export default function DashboardItemList({
  items,
  listItem,
  addItem,
}: Props): ReactElement {
  const [showAddItem, setShowAddItem] = useState(true);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {items.length === 0 ? (
        <p className="py-2 text-white">No items found!</p>
      ) : (
        <>
          {items.map((item) => {
            return <p>Thing</p>;
          })}
        </>
      )}
      {showAddItem ? createElement(addItem, { close: setShowAddItem }) : null}
      {showAddItem === false ? (
        <div className="w-full py-2 flex flex-col items-center justify-center">
          <FormButton
            loading={false}
            text="Add Item"
            click={() => setShowAddItem(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
