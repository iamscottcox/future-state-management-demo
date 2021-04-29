/*eslint @typescript-eslint/no-empty-function: "off"*/
import { useDidMount } from 'beautiful-react-hooks';
import { createContext, FC, useState } from 'react';

export const ArtistSearchContext = createContext({
  artistSearch: '',
  setArtistSearch: (value: string) => {},
  perPage: '100',
  setPerPage: (value: string) => {},
});

export const ArtistSearchContextProvider: FC = ({ children }) => {
  const [artistSearch, setArtistSearch] = useState('');
  const [perPage, setPerPage] = useState('100');

  useDidMount(() => {
    setArtistSearch(localStorage.getItem('artistSearch') || artistSearch);
    setPerPage(localStorage.getItem('artistPerPage') || perPage);
  });

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
