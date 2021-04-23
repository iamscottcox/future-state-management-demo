/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */

// @ts-ignore
declare namespace API {
    export interface Pagination {
      items: number;
      page: number;
      pages: number;
      per_page: number;
      urls: {
        last: string;
        next: string;
      };
    }
  
    export interface Response<T> {
      pagination: Pagination;
      results?: T;
      releases?: T;
    }
  
    export interface Artist {
      title: string;
      cover_image: string;
      thumb: string;
      id: string;
    }
  
    export interface Release {
      artist: string;
      id: number;
      main_release: number;
      resource_url: string;
      role: string;
      thumb: string;
      title: string;
      type: string;
      year: number;
    }
  
    export type SortTypes = "year" | "title" | "format";
    export type SortOrders = "asc" | "desc";
  }