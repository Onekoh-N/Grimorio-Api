export interface PaginationOptions {
    page?: number;
    limit?: number;
    select?: string | null;
    sort?: string;
    offset?: number;
}