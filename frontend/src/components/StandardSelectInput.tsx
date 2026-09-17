import type { SelectHTMLAttributes } from "react";

interface ISelectElement {
  id: string | number;
  value: string;
}

type StandardSelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  selectList: ISelectElement[];
};

const StandardSelectInput = ({
  selectList,
  ...props
}: StandardSelectInputProps) => {
  return (
    <select
      className="w-full py-2 border-black/30 border text-black/70 outline-none"
      {...props}
    >
      {selectList &&
        selectList.map((element: ISelectElement) => (
          <option key={element.id} value={element.id}>
            {element.value}
          </option>
        ))}
    </select>
  );
};
export default StandardSelectInput;
