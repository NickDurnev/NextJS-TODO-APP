import { FC } from "react";
import { format } from "date-fns";
import { Todo } from "@prisma/client";
import TODOInfoItem from "./TODOInfoItem";

interface IProps {
  data: Todo;
}

export const TODOInfoList: FC<IProps> = ({ data }) => {
  const { id, title, description, status, priority, createdAt } = data;

  const formattedDate = format(new Date(createdAt), "PP");
  const fieldsData = Object.entries({ status, priority, createdA:formattedDate });

  return (
    <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
      <div className="flex flex-col items-center">
        <h2 className="pb-14 text-skin-additional">{title}</h2>
        <ul className="w-full flex flex-col justify-start px-6">
          {fieldsData.map(([key, value]) => (
            <TODOInfoItem key={key} field={`${key}:`} value={`${value}`} />
          ))}
        </ul>
        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
            <div className="border-t-[1px] border-skin-main px-4 py-5 sm:px-6">
              <dd className="mt-1 text-sm text-skin-base sm:col-span-2">
                {description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
