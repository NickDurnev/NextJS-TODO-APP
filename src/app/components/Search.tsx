import { FC } from "react";
import clsx from "clsx";
import { DebounceInput } from "react-debounce-input";

interface IProps {
    addStyles?: string;
}

const Search: FC<IProps> = ({ addStyles }) => {
    return (
        <DebounceInput
            debounceTimeout={300}
            onChange={(e) => console.log(e.target.value)}
            placeholder="Search"
            className={clsx(
                `
            w-80
            form-input
            block 
            rounded-md 
            border-0 
            py-1.5 
            text-skin-additional 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-skin-additional
            placeholder:text-skin-additional
            bg-skin-main 
            focus:ring-2 
            focus:ring-inset 
            sm:text-sm 
            sm:leading-6
            resize-none`,
                addStyles
            )}
        />
    );
};

export default Search;
