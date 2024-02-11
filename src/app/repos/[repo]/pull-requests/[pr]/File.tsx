"use client";

import { ChangedFile } from "@/app/repos/[repo]/pull-requests/[pr]/page";
import DiffSet from "./DiffSet";
import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Checkbox from "./checkbox";
import { unviewFile, viewFile } from "./serverActions";

interface Props {
    file: ChangedFile;
    isViewed: boolean;
    repo: string;
    pr: number;
}

function File({ file, isViewed, repo, pr }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(isViewed);

    function toggleIsViewed() {
        if (isViewed) {
            // Server action
            unviewFile(repo, pr, file.filename);
        } else {
            setIsCollapsed(true);
            // Server action
            viewFile(repo, pr, file.filename);
        }
    }

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
                        isChecked={isViewed}
                        onChange={toggleIsViewed}
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
