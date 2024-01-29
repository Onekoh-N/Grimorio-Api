export class PaginationOptions {
    page?: number = 1;
    limit?: number = 10;
    select?: string[] = [];
    sort?: string = '_id';
    offset?: number = 0;
    tags?: string[];
    autorId?: string;
    nombre?: string;
    
}