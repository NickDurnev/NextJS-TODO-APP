import { FC, useState } from "react";
import Button from "./Button";
import TODOForm from "./TODOForm";
import Search from "./Search";

interface IProps {
    setSearch: (search: string) => void;
}

const AppBar: FC<IProps> = ({ setSearch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <Search setSearch={setSearch} addStyles="mx-auto" />
            <Button onClick={() => setIsModalOpen(true)} addStyles="w-40 mx-auto">
                Add new task
            </Button>
            <TODOForm onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
        </div>
    );
};

export default AppBar;
