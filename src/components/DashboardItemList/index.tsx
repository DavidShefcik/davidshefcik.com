import React, { ReactElement, createElement, Fragment, useState } from "react";

import FormButton from "../FormButton";

interface Props {
  items: Array<any>;
  listItem: any;
  addItem: any;
  showAddItem: boolean;
  setShowAddItem: any;
}

export default function DashboardItemList({
  items,
  listItem,
  addItem,
  showAddItem,
  setShowAddItem,
}: Props): ReactElement {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {items === null || items.length === 0 ? (
        <p className="py-2 text-white">No items found!</p>
      ) : (
        <>
          {items.map((item, index) => {
            return (
              <Fragment key={item.id}>
                {createElement(listItem, { ...item, even: index % 2 === 0 })}
              </Fragment>
            );
          })}
        </>
      )}
      {showAddItem ? createElement(addItem, { close: setShowAddItem }) : null}
      {showAddItem === false ? (
        <div className="w-full py-2 f-full flex flex-col items-center justify-center">
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
