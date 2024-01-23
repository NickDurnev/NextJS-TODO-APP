import {FC} from "react";

interface IProps {
    field: string
    value: string
}

const TODOInfoItem:FC<IProps> = ({field, value}) => {
  return (
    <li className="flex justify-left align-center p-2">
      <p className="text-sm w-20 font-medium text-skin-additional capitalize">{field}</p>
      <p className="text-sm text-skin-base sm:col-span-2 capitalize">
        {value}
      </p>
    </li>
  );
};

export default TODOInfoItem;