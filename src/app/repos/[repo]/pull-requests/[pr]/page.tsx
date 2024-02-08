import Link from "next/link";
import { ghToken } from "@/utils/env";

type DetailedPr = {
    id: number;
    number: number;
    title: string;
    changed_files: number;
    additions: number;
    deletions: number;
};

type ChangedFile = {
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch: string;
};

interface Props {
    params: { repo: string; pr: string };
}

async function Pr({ params }: Props) {
    const pullRequest: DetailedPr = await fetch(
        `https://api.github.com/repos/jbower493/${params.repo}/pulls/${params.pr}`,
        {
            headers: {
                Authorization: `Bearer ${ghToken}`,
            },
        }
    ).then((data) => data.json());

    const changedFiles: ChangedFile[] = await fetch(
        `https://api.github.com/repos/jbower493/${params.repo}/pulls/${params.pr}/files`,
        {
            headers: {
                Authorization: `Bearer ${ghToken}`,
            },
        }
    ).then((data) => data.json());

    return (
        <div>
            <h2 className="text-lg">
                {pullRequest.number} - {pullRequest.title}
            </h2>
            <p>Changed files: {pullRequest.changed_files}</p>
            <p>
                <span>+ {pullRequest.additions}, </span>
                <span>- {pullRequest.additions}</span>
            </p>
        </div>
    );
}

export default Pr;
