import { ghToken } from "@/utils/env";
import Link from "next/link";

interface Props {
    params: { repo: string };
}

type Pr = {
    id: number;
    number: number;
    title: string;
};

async function Repo({ params }: Props) {
    const pullRequests: Pr[] = await fetch(
        `https://api.github.com/repos/jbower493/${params.repo}/pulls`,
        {
            headers: {
                Authorization: `Bearer ${ghToken}`,
            },
        }
    ).then((data) => data.json());

    return (
        <div>
            <h2 className="text-lg">{params.repo} - Pull Requests</h2>
            <ul>
                {pullRequests.map((pr) => {
                    return (
                        <li key={pr.id}>
                            <Link
                                href={`/repos/${
                                    params.repo
                                }/pull-requests/${pr.number.toString()}`}
                            >
                                {pr.number} - {pr.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Repo;
