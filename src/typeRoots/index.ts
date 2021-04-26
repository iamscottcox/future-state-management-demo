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
  
    export interface ArtistPreview {
      title: string;
      cover_image: string;
      thumb: string;
      id: string;
    }

    interface ArtistImage {
      height: number;
      resource_url: string;
      type: string;
      uri: string;
      uri150: string;
      width: number;
    }

    interface ArtistMember {
      active: boolean;
      id: number;
      name: string;
      resource_url: string;
    }

    export interface Artist {
      name: string;
      realname: string;
      namevariations: string[];
      profile: string;
      releases_url: string;
      resource_url: string;
      uri: string;
      urls: string[];
      data_quality: string;
      id: number;
      images: ArtistImage[];
      members: ArtistMember[];
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