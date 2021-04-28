import { NextRouter } from 'next/dist/next-server/lib/router/router';

interface SearchParam {
  key: string;
  value?: string | number;
}

export const handleNewParam = (params: URLSearchParams) => ({
  key,
  value,
}: SearchParam) => {
  if (value === undefined || value === '') {
    params.delete(key);
  } else {
    params.set(key, `${value}`);
  }
};

export const createNewPath = (newSearchParams: SearchParam[] | SearchParam) => {
  const url = new URL(document.location.toString());
  const searchParams = url.searchParams;

  if (Array.isArray(newSearchParams)) {
    newSearchParams.forEach(handleNewParam(searchParams));
  } else {
    handleNewParam(searchParams)(newSearchParams);
  }

  const splitRoute = url.pathname.split('?');

  return `${splitRoute}?${searchParams.toString()}`;
};

export const replacePath = (router: NextRouter) => (key: string) => (
  value: string
) => {
  const newPath = createNewPath({ key, value });
  router.replace(newPath, undefined, { scroll: false });
};

export const parseSearchQuery = (
  searchQuery: string | string[],
  defaultValue?: string
) => {
  if (!searchQuery) {
    return defaultValue;
  } else if (Array.isArray(searchQuery)) {
    return searchQuery.join(',');
  } else {
    return searchQuery;
  }
};
