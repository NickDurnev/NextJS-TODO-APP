"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
    const baseStyles = {
        background: "#4240402a",
        color: "#c0b9b9",
        zIndex: 50,
    };

    return (
        <Toaster
            toastOptions={{
                success: {
                    style: {
                        ...baseStyles,
                        border: "1px solid #299a23",
                    },
                },
                error: {
                    style: {
                        ...baseStyles,
                        border: "1px solid #971a0a",
                    },
                },
            }}
        />
    );
};

export default ToasterContext;
