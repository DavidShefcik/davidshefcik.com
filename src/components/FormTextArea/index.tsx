import React, {
  ReactElement,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";

interface Props {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function FormTextArea({ value, onChange }: Props): ReactElement {
  function change(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <textarea
      className="px-4 py-3 my-1 w-full lg:w-2/3 h-64 lg:h-auto text-white bg-darker-primary-background rounded-sm outline-none transition ease-in duration-75 border border-solid border-darker-primary-background border-darker-primary-background focus:border-blue-400"
      defaultValue={value}
      onChange={change}
    />
  );
}
