import { ChangeEvent, FC, FormEvent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Search from 'src/components/Articles/Filters/Search';
import TagSelect from 'src/components/Articles/Filters/Tags';
import { getSearchValue, getSelectedTag } from 'src/getters/filters';
import { AppDispatch, AppState } from 'src/state';
import { setFilter } from 'src/state/slices/filters';

const StyledArticleFilters = styled.fieldset`
    display: flex;
    border: none;
    padding: 0;

    > * {
        padding: 0.25rem;

        &:first-of-type {
            padding-left: 0;
            margin-left: 0;
        }

        &:last-of-type {
            padding-right: 0;
            margin-right: 0;
        }
    }
`

interface StateProps {
    searchValue: ReturnType<typeof getSearchValue>;
    selectedTag: ReturnType<typeof getSelectedTag>;
}

interface OwnProps { isLoading: boolean };

interface DispatchProps {
    handleSearchSubmit: (value: string) => void;
    handleTagChange: (value: string) => void;
}

type Props = StateProps & OwnProps & DispatchProps;

export const ArticleFilters: FC<Props> = ({ searchValue, selectedTag, handleSearchSubmit, handleTagChange, isLoading = false }) => {
    return (
        <StyledArticleFilters disabled={isLoading}>
            <Search initialValue={searchValue} onSubmit={handleSearchSubmit} />
            <TagSelect selectedTag={selectedTag} onChange={handleTagChange} />
        </StyledArticleFilters>
    )
}

const mapStateToProps = (state: AppState): StateProps => ({
    searchValue: getSearchValue(state),
    selectedTag: getSelectedTag(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    handleSearchSubmit(value) {
        dispatch(setFilter({ search: value }))
    },
    handleTagChange(value) {
        dispatch(setFilter({ tag: value }));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFilters);