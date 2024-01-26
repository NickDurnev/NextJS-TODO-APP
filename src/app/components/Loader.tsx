import clsx from "clsx";

const Loader = ({ addStyles }: { addStyles?: string }) => {
    return (
        <div
            className={clsx(
                "dot-spinner absolute top-[25vh] left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2",
                addStyles
            )}
        >
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>
    );
};

export default Loader;
