"use client";

import { CommentPayload } from "@/backend/externalRequests/createReviewComment";
import { createReviewCommentAction } from "./serverActions";
import { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

type DiffHeaderLine = `@@${string}`;

function isDiffHeaderLine(line: string): line is DiffHeaderLine {
    return line.startsWith("@@");
}

type AddedLine = `+${string}`;

function isAddedLine(line: string): line is AddedLine {
    return line.startsWith("+");
}

type RemovedLine = `-${string}`;

function isRemovedLine(line: string): line is RemovedLine {
    return line.startsWith("-");
}

interface Props {
    line: DiffHeaderLine | AddedLine | RemovedLine | string;
    index: number;
    originalLineNumber: number;
    newLineNumber: number;
    prHeadSha: string;
    filePath: string;
    repo: string;
    pr: number;
}

function Line({
    line,
    index,
    originalLineNumber,
    newLineNumber,
    prHeadSha,
    filePath,
    repo,
    pr,
}: Props) {
    const [isCommenting, setIsCommenting] = useState(false);
    const [commentBody, setCommentBody] = useState("");

    function createComment() {
        const payload: CommentPayload = {
            body: commentBody,
            commit_id: prHeadSha,
            path: filePath,
            line: isAddedLine(line) ? newLineNumber : originalLineNumber,
        };

        createReviewCommentAction(repo, pr, payload);
    }

    function renderLine() {
        if (line === "\\ No newline at end of file") {
            return null;
        }

        if (isDiffHeaderLine(line)) {
            return (
                <p className="bg-blue-900 py-2 px-4 text-sm">
                    <span className="w-24 inline-block" />
                    {line}
                </p>
            );
        }

        if (isAddedLine(line)) {
            return (
                <p
                    key={index}
                    className="bg-green-900 py-1 px-4 whitespace-pre flex items-center text-sm"
                >
                    <span className="inline-flex justify-evenly">
                        <span className="w-12 inline-flex justify-center" />
                        <span className="w-12 inline-flex justify-center">
                            {newLineNumber}
                        </span>
                    </span>
                    <button
                        className="mx-1 px-2 py-1 bg-black border-neutral-400 border rounded-md"
                        onClick={() => setIsCommenting(true)}
                    >
                        <FaCommentDots />
                    </button>
                    <span className="w-5 inline-block">{line[0]}</span>
                    {line.slice(1)}
                </p>
            );
        }

        if (isRemovedLine(line)) {
            return (
                <p
                    key={index}
                    className="bg-red-900 py-1 px-4 whitespace-pre text-sm"
                >
                    <span className="w-24 inline-flex justify-evenly">
                        <span className="w-12 inline-flex justify-center">
                            {originalLineNumber}
                        </span>
                        <span className="w-12 inline-flex justify-center" />
                    </span>
                    <button
                        className="mx-1 px-2 py-1 bg-black border-neutral-400 border rounded-md"
                        onClick={() => setIsCommenting(true)}
                    >
                        <FaCommentDots />
                    </button>
                    <span className="w-5 inline-block">{line[0]}</span>
                    {line.slice(1)}
                </p>
            );
        }

        // Lines that have not been edited seem to have 1 random space at the start that we need to get rid of
        const trimmedLine = line.slice(1);

        return (
            <p key={index} className="py-1 px-4 whitespace-pre text-sm">
                <span className="w-24 inline-flex justify-evenly">
                    <span className="w-12 inline-flex justify-center">
                        {originalLineNumber}
                    </span>
                    <span className="w-12 inline-flex justify-center">
                        {newLineNumber}
                    </span>
                </span>
                <button
                    className="mx-1 px-2 py-1 bg-black border-neutral-400 border rounded-md"
                    onClick={() => setIsCommenting(true)}
                >
                    <FaCommentDots />
                </button>
                <span className="w-5 inline-block" />
                {trimmedLine}
            </p>
        );
    }

    return (
        <div>
            {renderLine()}
            {isCommenting &&
            line !== "\\ No newline at end of file" &&
            !isDiffHeaderLine(line) ? (
                <div className="bg-black border-neutral-400 border rounded-sm p-2 flex justify-between items-center gap-4">
                    <input
                        className="flex-1 text-black px-2 py-1"
                        type="text"
                        name="comment"
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                    />
                    <button
                        className="mx-1 px-2 py-1 bg-black border-neutral-400 border rounded-md"
                        onClick={() => {
                            setIsCommenting(false);
                            createComment();
                        }}
                    >
                        Save Comment
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default Line;
