import React, {
  ReactElement,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

interface DropdownItem {
  value: any;
  text: string;
}

interface Props {
  values: Array<DropdownItem>;
  defaultValue: DropdownItem;
  onChange: Dispatch<SetStateAction<any>>;
  error?: boolean;
  value?: string;
}

export default function FormDropdown({
  values,
  defaultValue,
  onChange,
  error,
  value,
}: Props): ReactElement {
  function change(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <select
      onChange={change}
      className={`px-4 py-3 my-1 w-2/3 lg:w-2/4 text-white bg-secondary-background rounded-sm outline-none transition ease-in duration-75 border border-solid ${
        error ? "border-red-600" : "border-darker-primary-background"
      } focus:border-blue-400`}
      value={value}
    >
      <option value={defaultValue.value}>{defaultValue.text}</option>
      {values.map((val) => {
        return (
          <option value={val.value} key={val.text}>
            {val.text}
          </option>
        );
      })}
    </select>
  );
}
