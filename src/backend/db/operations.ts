import fs from "fs";
import { Database, ViewedFile } from "./schema";

const databaseFilePath = "./src/backend/db/database.json";

export async function markFileViewed(
    fileRepo: string,
    filePr: number,
    filePath: string
) {
    return new Promise<{ message: string }>((resolve, reject) => {
        fs.readFile(databaseFilePath, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                const databaseFile: Database = JSON.parse(data);
                const viewedFiles = databaseFile.viewed_files;

                let isExistingEntry = false;
                const newViewedFiles = [...viewedFiles].map((existingEntry) => {
                    const { repo, pr, file_path } = existingEntry;

                    if (
                        repo === fileRepo &&
                        pr === filePr &&
                        file_path === filePath
                    ) {
                        // This is an existing entry for the file to be marked viewed
                        isExistingEntry = true;

                        return {
                            ...existingEntry,
                            is_viewed: true,
                        };
                    }

                    return existingEntry;
                });

                if (!isExistingEntry) {
                    newViewedFiles.push({
                        repo: fileRepo,
                        pr: filePr,
                        file_path: filePath,
                        is_viewed: true,
                    });
                }

                const newDatabase: Database = {
                    ...databaseFile,
                    viewed_files: newViewedFiles,
                };

                fs.writeFile(
                    databaseFilePath,
                    JSON.stringify(newDatabase),
                    (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                message: "File successfully marked as viewed",
                            });
                        }
                    }
                );
            }
        });
    });
}

export async function markFileNotViewed(
    fileRepo: string,
    filePr: number,
    filePath: string
) {
    return new Promise<{ message: string }>((resolve, reject) => {
        fs.readFile(databaseFilePath, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                const databaseFile: Database = JSON.parse(data);
                const viewedFiles = databaseFile.viewed_files;

                let isExistingEntry = false;
                const newViewedFiles = [...viewedFiles].map((existingEntry) => {
                    const { repo, pr, file_path } = existingEntry;

                    if (
                        repo === fileRepo &&
                        pr === filePr &&
                        file_path === filePath
                    ) {
                        // This is an existing entry for the file to be marked unviewed
                        isExistingEntry = true;

                        return {
                            ...existingEntry,
                            is_viewed: false,
                        };
                    }

                    return existingEntry;
                });

                if (!isExistingEntry) {
                    newViewedFiles.push({
                        repo: fileRepo,
                        pr: filePr,
                        file_path: filePath,
                        is_viewed: false,
                    });
                }

                const newDatabase: Database = {
                    ...databaseFile,
                    viewed_files: newViewedFiles,
                };

                fs.writeFile(
                    databaseFilePath,
                    JSON.stringify(newDatabase),
                    (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                message:
                                    "File successfully marked as not viewed",
                            });
                        }
                    }
                );
            }
        });
    });
}

export async function getPrViewedFiles(fileRepo: string, filePr: number) {
    return new Promise<ViewedFile[]>((resolve, reject) => {
        fs.readFile(
            "./src/backend/db/database.json",
            "utf-8",
            (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    const databaseFile: Database = JSON.parse(data);
                    const viewedFiles = databaseFile.viewed_files;
                    resolve(viewedFiles);
                }
            }
        );
    });
}
