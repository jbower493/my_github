"use server";

import { markFileNotViewed, markFileViewed } from "@/backend/db/operations";
import {
    CommentPayload,
    createReviewComment,
} from "@/backend/externalRequests/createReviewComment";
import { revalidatePath } from "next/cache";

export async function viewFileAction(
    repo: string,
    pr: number,
    filePath: string
) {
    await markFileViewed(repo, pr, filePath);

    revalidatePath(`repos/${repo}/pull-requests/${pr}`);
}

export async function unviewFileAction(
    repo: string,
    pr: number,
    filePath: string
) {
    await markFileNotViewed(repo, pr, filePath);

    revalidatePath(`repos/${repo}/pull-requests/${pr}`);
}

export async function createReviewCommentAction(
    repo: string,
    pr: number,
    payload: CommentPayload
) {
    await createReviewComment(repo, pr, payload);
}
