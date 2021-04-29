/*eslint @typescript-eslint/no-empty-function: "off"*/
import { useRouter } from 'next/dist/client/router';
import { createContext, FC, useEffect, useState } from 'react';

export const ArtistSearchContext = createContext({
  artistSearch: '',
  setArtistSearch: (value: string) => {},
  perPage: '100',
  setPerPage: (value: string) => {},
});

export const ArtistSearchContextProvider: FC = ({ children }) => {
  const { isReady } = useRouter();
  const [artistSearch, setArtistSearch] = useState('');
  const [perPage, setPerPage] = useState('100');

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
          localStorage.setItem('artistPerPage', value);
        },
      }}
    >
      {children}
    </ArtistSearchContext.Provider>
  );
};
