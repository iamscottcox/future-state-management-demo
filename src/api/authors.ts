export interface Author {
    biography: string;
    dateCreated: Date;
    dateModified: Date;
    id: string;
    name: string;
    shared: boolean;
    site: string;
    slug: string;
    status: string;
    url: string;
    role?: string;
}