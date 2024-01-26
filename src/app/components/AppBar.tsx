import { FC, useState } from "react";
import Button from "./buttons/Button";
import TODOForm from "./TODOForm";
import Search from "./Search";

interface IProps {
    setSearch: (search: string) => void;
    setMutation: (data: any) => void;
}

const AppBar: FC<IProps> = ({ setSearch, setMutation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <Search setSearch={setSearch} addStyles="mx-auto" />
            <Button onClick={() => setIsModalOpen(true)} addStyles="w-40 mx-auto">
                Add new task
            </Button>
            <TODOForm onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} setMutation={setMutation} />
        </div>
    );
};

export default AppBar;
