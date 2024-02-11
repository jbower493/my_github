import { ghToken } from "@/utils/env";

export interface CommentPayload {
    body: string;
    commit_id: string;
    path: string;
    line: number;
}

export async function createReviewComment(
    repo: string,
    pr: number,
    payload: CommentPayload
) {
    const result = await fetch(
        `https://api.github.com/repos/jbower493/${repo}/pulls/${pr}/comments`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ghToken}`,
            },
            body: JSON.stringify(payload),
        }
    ).then((data) => data.json());

    return result;
}
