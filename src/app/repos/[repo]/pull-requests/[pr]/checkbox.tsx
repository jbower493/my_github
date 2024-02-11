import { FaCheckSquare, FaSquare } from "react-icons/fa";

interface Props {
    label: string;
    isChecked: boolean;
    onChange: () => void;
}

function Checkbox({ label, isChecked, onChange }: Props) {
    return (
        <button
            onClick={onChange}
            className={`flex gap-2 items-center border-neutral-400 border rounded-md py-1 px-2${
                isChecked ? " bg-blue-950 border-blue-600" : ""
            }`}
        >
            {isChecked ? <FaCheckSquare /> : <FaSquare />}
            <span>{label}</span>
        </button>
    );
}

export default Checkbox;
