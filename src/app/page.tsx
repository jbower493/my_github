import { ghToken } from "@/utils/env";
import Link from "next/link";

type Repo = {
    name: string;
    id: number;
};

export default async function Home() {
    const repos: Repo[] = await fetch(
        "https://api.github.com/users/jbower493/repos",
        {
            headers: {
                Authorization: `Bearer ${ghToken}`,
            },
        }
    ).then((data) => data.json());

    return (
        <main className="p-5">
            <h1 className="text-2xl">My Github</h1>
            <ul>
                {repos.map((repo) => {
                    return (
                        <li key={repo.id}>
                            <Link href={`/repos/${repo.name}`}>
                                {repo.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
