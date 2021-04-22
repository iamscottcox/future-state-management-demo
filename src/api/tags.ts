import fetchRequest from 'src/api';

export interface Tag {
    abbreviation?: string;
    dateCreated: string;
    dateModified: string;
    id: string
    indexed: string;
    name: string;
    site: string;
    slug: string;
    type: string;
    url: string;
}

export interface FetchTagsResponse {
    docs: Tag[];
  }

export const fetchTags = async () => {
    try {
        const response = await fetchRequest<FetchTagsResponse>('/data/tags.json');
        return response.docs;
    } catch (error) {
        console.error('There was a problem fetching tags');
        return error;
    }
}