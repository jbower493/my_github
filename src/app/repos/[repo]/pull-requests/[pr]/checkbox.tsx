import { FaCheckSquare, FaSquare } from "react-icons/fa";

interface Props {
    label: string;
    isChecked: boolean;
    onChange: () => void;
}

function Checkbox({ label, isChecked, onChange }: Props) {
    return (
        <button onClick={onChange} className="flex gap-2 items-center">
            {isChecked ? <FaCheckSquare /> : <FaSquare />}
            <span>{label}</span>
        </button>
    );
}

export default Checkbox;
