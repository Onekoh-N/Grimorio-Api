import { PaginationOptions } from "../interfaces/PaginationOptions.Interface";

export class BusquedaDTO extends PaginationOptions{
    tags?: string[];
    readonly autorId?: string;
    readonly nombre?: string;
} 