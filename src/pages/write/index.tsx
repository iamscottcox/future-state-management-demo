import { useDidMount, useWillUnmount } from 'beautiful-react-hooks';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { getWriteDraft } from 'src/getters/drafts';

import { AppDispatch, AppState } from 'src/state';
import { setDraft } from 'src/state/slices/drafts';
import styled from 'styled-components';

interface StateProps {
  draft: AppState['drafts']['write'];
}
interface DispatchProps {
    setDraft: (draft: AppState['drafts']['write']) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps

const StyledWritePage = styled.div`
  form {
    display: flex;
    flex-direction: column;

    label {
      .editing-icon {
        color: white;
        background: red;
        border-radius: 15px;
        width: 15px;
        height: 15px;
        display: none;
        text-align: center;
      }

      &.editing .editing-icon {
        display: inline-block;
      }
    }

    input {
      margin-bottom: 1rem;
    }
  }
`

export const WritePage: FC<Props> = ({ draft, setDraft }) => {
  const { title: draftTitle, body: draftBody } = draft;

  const [title, setTitle] = useState(draftTitle);
  const [body, setBody] = useState(draftBody);

  const editingTitle = useMemo(() => title !== '', [title]);
  const editingBody = useMemo(() => body !== '', [body]);
  const isDraft = useMemo(() => editingTitle || editingBody, [editingTitle, editingBody]);

  useWillUnmount(() => {
    setDraft({ title, body });
  })

  return (
    <StyledWritePage>
      {isDraft && (
        <p>This article is being edited</p>
      )}
      <form>
        <label className={editingTitle ? 'editing' : ''} htmlFor="write-title">Title <span className="editing-icon">!</span></label>
        <input id="write-title" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
        <label className={editingBody ? 'editing' : ''}htmlFor="write-body">Body <span className="editing-icon">!</span></label>
        <textarea id="write-body" value={body} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}>{body}</textarea>
      </form>
    </StyledWritePage>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  draft: getWriteDraft(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setDraft(draft) {
    dispatch(setDraft({ write: draft }));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WritePage)