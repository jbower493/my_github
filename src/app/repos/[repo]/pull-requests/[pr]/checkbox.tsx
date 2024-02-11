import { FaCheckSquare, FaSpinner, FaSquare } from "react-icons/fa";

interface Props {
    label: string;
    isChecked: boolean;
    onChange: () => void;
    isLoading?: boolean;
}

function Checkbox({ label, isChecked, onChange, isLoading }: Props) {
    function renderIcon() {
        if (isLoading) {
            return <FaSpinner className="animate-spin" />;
        }

        if (isChecked) {
            return <FaCheckSquare />;
        }

        return <FaSquare />;
    }

    return (
        <button
            onClick={onChange}
            className={`flex gap-2 items-center border-neutral-400 border rounded-md py-1 px-2${
                isChecked ? " bg-blue-950 border-blue-600" : ""
            }`}
            disabled={isLoading}
        >
            {renderIcon()}
            <span>{label}</span>
        </button>
    );
}

export default Checkbox;
