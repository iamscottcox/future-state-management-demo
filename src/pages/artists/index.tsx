import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { Artists } from 'src/components/Artists'
import Search from 'src/components/Filters/Search'
import { Pagination } from 'src/components/Pagination'
import { getArtistsSearchValue } from 'src/getters/filters'
import { useArtists } from 'src/hooks/artists'
import { AppState } from 'src/state'
import { setFilter } from 'src/state/slices/filters'

interface StateProps {
    search: AppState['filters']['artists']['search'];
}

interface DispatchProps {
    setSearch: (value: StateProps['search']) => void;
}

type Props = StateProps & DispatchProps;

export const ArticlesPage: FC<Props> = ({ search, setSearch }) => {
  const router = useRouter()
  const page = parseInt(router.query.page as string || '1');
  const { isLoading, data, error } = useArtists({ search, pageNumber: page })

  const handleSearchSubmit = (value: string) => {
    setSearch(value);
    router.push('/artists')
  }

  return (
    <div>
        <Search initialValue={search} onSubmit={handleSearchSubmit}/>
        <Pagination page={page} pages={data?.pagination?.pages} />
        <Artists artists={data?.results} isLoading={isLoading} error={error} />
    </div>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  search: getArtistsSearchValue(state),
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setSearch(value) {
    dispatch(setFilter({ artists: { search: value } }));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage)
