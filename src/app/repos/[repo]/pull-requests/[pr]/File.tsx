"use client";

import { ChangedFile } from "@/app/repos/[repo]/pull-requests/[pr]/page";
import DiffSet from "./DiffSet";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import Checkbox from "./checkbox";

interface Props {
    file: ChangedFile;
}

function File({ file }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isViewed, setIsViewed] = useLocalStorage(
        `${file.filename}-isViewed`,
        "no"
    );

    const patchLines = file.patch.split("\n");

    const diffSets: string[][] = [];
    let oneDiffBuffer: string[] = [];

    patchLines.forEach((line, index) => {
        if (line.trim().startsWith("@@") && index !== 0) {
            diffSets.push(oneDiffBuffer);
            oneDiffBuffer = [];
        }

        oneDiffBuffer.push(line);
    });
    diffSets.push(oneDiffBuffer);

    useEffect(() => {
        setIsViewed(isViewed);
    }, []);

    return (
        <div className="border-neutral-900 border rounded-md overflow-hidden">
            <div className="bg-neutral-700 border-b-neutral-600 py-3 px-4 flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsCollapsed((prev) => !prev)}>
                        {isCollapsed ? <FaChevronRight /> : <FaChevronDown />}
                    </button>
                    <h3>{file.filename}</h3>
                </div>
                <div>
                    <Checkbox
                        label="Viewed"
                        isChecked={isViewed === "yes"}
                        onChange={() =>
                            setIsViewed((prev) =>
                                prev === "yes" ? "no" : "yes"
                            )
                        }
                    />
                </div>
            </div>
            {isCollapsed ? null : (
                <div>
                    {diffSets.map((diffSet, index) => {
                        return <DiffSet key={index} lines={diffSet} />;
                    })}
                </div>
            )}
        </div>
    );
}

export default File;
