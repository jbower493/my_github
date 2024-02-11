export interface ViewedFile {
    repo: string;
    pr: number;
    file_path: string;
    is_viewed: boolean;
}

export interface Database {
    viewed_files: ViewedFile[];
}
