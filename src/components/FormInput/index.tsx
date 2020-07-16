import React, {
  ReactElement,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";

interface Props {
  type: string;
  placeholder: string;
  maxLength: number;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function FormInput({
  type,
  placeholder,
  maxLength,
  onChange,
}: Props): ReactElement {
  function change(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={change}
      className="px-4 py-3 my-1 w-2/3 md:1/3 lg:w-1/4 xl:w-1/5 text-white bg-secondary-background rounded-sm outline-none transition ease-in duration-75 border border-solid border-secondary-background focus:border-blue-400"
    />
  );
}
