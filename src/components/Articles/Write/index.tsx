import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getWriteArticleDraft } from 'src/getters/drafts';
import { AppDispatch, AppState } from 'src/state';
import { setDraft, DraftsState } from 'src/state/slices/drafts';

interface StateProps {
    writeArticleDraft: DraftsState['writeArticle'];
}
interface DispatchProps {
    setWriteArticleDraft: ({
        title,
        strapline,
        synopsis,
    }: {
        title: DraftsState['writeArticle']['title'];
        strapline: DraftsState['writeArticle']['strapline'];
        synopsis: DraftsState['writeArticle']['synopsis'];
    }) => void;
}

type Props = StateProps & DispatchProps;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

export const WriteArticle: FC<Props> = ({ writeArticleDraft, setWriteArticleDraft }) => {
    const [title, setTitle] = useState('');
    const [strapline, setStrapline] = useState('');
    const [synopsis, setSynopsis] = useState('');

    useEffect(() => {
        // We set initialState in here because it's loaded from localStorage via Redux
        const { title: draftTitle, strapline: draftStrapline, synopsis: draftSynopsis } = writeArticleDraft;
        setTitle(draftTitle);
        setStrapline(draftStrapline);
        setSynopsis(draftSynopsis);
    }, [writeArticleDraft])

    return (
        <StyledForm onBlur={() => {
            setWriteArticleDraft({ title, strapline, synopsis })
        }}>
            <label htmlFor="article-title-textarea">
                Title
            </label>
            <textarea id="article-title-textarea" value={title} onChange={(e => setTitle(e.target.value))} />
            <label htmlFor="article-strapline-textarea">
                Strapline
            </label>
            <textarea id="article-strapline-textarea" value={strapline} onChange={(e => setStrapline(e.target.value))} />
            <label htmlFor="article-synopsis-textarea">
                Synopsis
            </label>
            <textarea id="article-synopsis-textarea" value={synopsis} onChange={(e => setSynopsis(e.target.value))} />
        </StyledForm>
    )
}

const mapStateToProps = (state: AppState): StateProps => ({
    writeArticleDraft: getWriteArticleDraft(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    setWriteArticleDraft(values) {
        dispatch(setDraft({ writeArticle: values }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);