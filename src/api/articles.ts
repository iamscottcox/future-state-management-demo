import { fetchRequest } from 'src/api';
import { Author } from 'src/api/authors';

export interface Article {
  id: string;
  dateCreated: Date;
  dateModified: Date;
  datePublished: Date;
  dateUpdatedByEditor: Date;
  status: string;
  url: string;
  slug: string;
  name: string;
  site: string;
  shared: boolean;
  role?: string;
  biography?: string;
  authors: Author[];
  label: string
  language: string
  products: null
  review: { rating: string, verdict: string }
  strapline: string
  synopsis: string
  template: string
  type: string
}

export interface FetchArticlesResponse {
  docs: Article[];
}

export const fetchArticles = async () => {
  try {
    const response = await fetchRequest<FetchArticlesResponse>('/data/articles.json');
    return response.docs;
  } catch (error) {
    console.error('There was a problem fetching articles');
    return error;
  }
}

export default fetchArticles;