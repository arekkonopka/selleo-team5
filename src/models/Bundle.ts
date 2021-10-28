import { Tag } from './Tag';

export interface Bundle {
    _id: number;
    name: string;
    description: string;
    tags: Tag[];
}
