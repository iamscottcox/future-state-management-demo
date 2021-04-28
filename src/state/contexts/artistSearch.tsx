/*eslint @typescript-eslint/no-empty-function: "off"*/
import { useDidMount } from 'beautiful-react-hooks';
import { createContext, FC, useEffect, useState } from 'react';

export const ArtistSearchContext = createContext({
  artistSearch: '',
  setArtistSearch: (value: string) => {},
  perPage: 100,
  setPerPage: (value: number) => {},
});

export const ArtistSearchContextProvider: FC = ({ children }) => {
  const [artistSearch, setArtistSearch] = useState('');
  const [perPage, setPerPage] = useState(100);

  useDidMount(() => {
    console.group('useDidMount');
    const foo = localStorage.getItem('artistSearch');
    console.log('foo', foo);
    setArtistSearch(foo || artistSearch);
    console.groupEnd();
  });

  useEffect(() => {
    console.group('useEffect');
    const foo = localStorage.getItem('artistSearch');
    console.log('foo', foo);
    setArtistSearch(foo || '');
    console.groupEnd();
  }, []);

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
