import { IoSadSharp } from "react-icons/io5";

const EmptyState = () => {
    return (
        <div className="px-4 py-10 sm:px-6 lg:px-8 h-full text-cneter items-center flex flex-col gap-6">
            <h3 className="mt-2 text-2xl font-semibold text-skin-base">
                Nothing found
            </h3>
            <span className="text-skin-base">
                <IoSadSharp size={50} />
            </span>
        </div>
    );
};

export default EmptyState;
