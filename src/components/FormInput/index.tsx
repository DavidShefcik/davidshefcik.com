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
  value: string;
  error?: boolean;
}

export default function FormInput({
  type,
  placeholder,
  maxLength,
  onChange,
  value,
  error,
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
      value={value}
      className={`px-4 py-3 my-1 w-2/3 lg:w-2/4 text-white bg-secondary-background rounded-sm outline-none transition ease-in duration-75 border border-solid ${
        error ? "border-red-600" : "border-darker-primary-background"
      } focus:border-blue-400`}
    />
  );
}
