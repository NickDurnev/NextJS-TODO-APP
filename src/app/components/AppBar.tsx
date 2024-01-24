import { useState } from "react";
import Button from "./Button";
import TODOForm from "./TODOForm";
import Search from "./Search";

const AppBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6 py-8">
            <Search addStyles="mx-auto" />
            <Button onClick={() => setIsModalOpen(true)} addStyles="w-40 mx-auto">
                Add new task
            </Button>
            <TODOForm onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
        </div>
    );
};

export default AppBar;
