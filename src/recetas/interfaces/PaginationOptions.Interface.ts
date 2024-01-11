export class PaginationOptions {
    page?: number = 1;
    limit?: number = 10;
    select?: string[] = [];
    sort?: string = 'nombre';
    offset?: number = 0;
    tags?: string[];
    readonly autorId?: string;
    readonly nombre?: string;
    
}