import Link from "next/link";

interface Props {
    params: { repo: string };
}

function Repo({ params }: Props) {
    return (
        <div>
            <h2 className="text-lg">{params.repo}</h2>
            <Link href={`/repos/${params.repo}/pull-requests`}>
                Pull Requests
            </Link>
        </div>
    );
}

export default Repo;
