import { ghToken } from "@/utils/env";
import File from "@/app/repos/[repo]/pull-requests/[pr]/File";
import { getPrViewedFiles, markFileViewed } from "@/backend/db/operations";

type DetailedPr = {
    id: number;
    number: number;
    title: string;
    changed_files: number;
    additions: number;
    deletions: number;
};

export type ChangedFile = {
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

    const viewedFiles = await getPrViewedFiles(params.repo, Number(params.pr));
    const numOfFilesViewed = viewedFiles.filter(
        (file) => file.is_viewed
    ).length;

    return (
        <div>
            <h2 className="text-lg">
                {pullRequest.number} - {pullRequest.title}
            </h2>
            <div className="flex justify-between items-center">
                <p>Changed files: {pullRequest.changed_files}</p>
                <p>
                    {numOfFilesViewed} / {pullRequest.changed_files} files
                    viewed
                </p>
            </div>
            <p>
                <span>+ {pullRequest.additions}, </span>
                <span>- {pullRequest.additions}</span>
            </p>
            <section className="flex flex-col gap-5 mt-5">
                {changedFiles.map((file) => {
                    const isViewed = viewedFiles.some(
                        ({ file_path, repo, is_viewed }) =>
                            file_path === file.filename &&
                            repo === params.repo &&
                            is_viewed
                    );

                    return (
                        <File
                            key={file.filename}
                            file={file}
                            isViewed={isViewed}
                            repo={params.repo}
                            pr={Number(params.pr)}
                        />
                    );
                })}
            </section>
        </div>
    );
}

export default Pr;
