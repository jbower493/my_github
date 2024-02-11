"use server";

import { markFileNotViewed, markFileViewed } from "@/backend/db/operations";
import { revalidatePath } from "next/cache";

export async function viewFile(repo: string, pr: number, filePath: string) {
    await markFileViewed(repo, pr, filePath);

    revalidatePath(`repos/${repo}/pull-requests/${pr}`);
}

export async function unviewFile(repo: string, pr: number, filePath: string) {
    await markFileNotViewed(repo, pr, filePath);

    revalidatePath(`repos/${repo}/pull-requests/${pr}`);
}
