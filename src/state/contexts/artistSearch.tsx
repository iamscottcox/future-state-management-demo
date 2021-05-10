/*eslint @typescript-eslint/no-empty-function: "off"*/
import { useRouter } from 'next/dist/client/router';
import { createContext, FC, useEffect, useState } from 'react';

interface ArtistSearchContextSchema {
  artistSearch: string;
  setArtistSearch: (value: string) => void;
  perPage: number | string;
  setPerPage: (value: string | number) => void;
}

export const ArtistSearchContext = createContext<ArtistSearchContextSchema>({
  artistSearch: '',
  setArtistSearch: (value) => {},
  perPage: '100',
  setPerPage: (value) => {},
});

export const ArtistSearchContextProvider: FC = ({ children }) => {
  const { isReady } = useRouter();
  const [artistSearch, setArtistSearch] = useState('');
  const [perPage, setPerPage] = useState<string | number>('100');

  useEffect(() => {
    if (isReady) {
      setArtistSearch(localStorage.getItem('artistSearch') || artistSearch);
      setPerPage(localStorage.getItem('artistPerPage') || perPage);
    }
  }, [isReady]);

  return (
    <ArtistSearchContext.Provider
      value={{
        artistSearch,
        setArtistSearch: (value) => {
          setArtistSearch(value);
          localStorage.setItem('artistSearch', value);
        },
        perPage,
        setPerPage: (value) => {
          setPerPage(value);
        },
      }}
    >
      {children}
    </ArtistSearchContext.Provider>
  );
};
