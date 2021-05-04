import { TextField } from '@material-ui/core';
import { useWillUnmount } from 'beautiful-react-hooks';
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

type Props = StateProps & DispatchProps & OwnProps;

const StyledWritePage = styled.div`
  form {
    display: flex;
    flex-direction: column;

    fieldset {
      align-items: center;
      display: flex;
      border: none;

      .editing-icon {
        color: white;
        background: red;
        border-radius: 15px;
        width: 15px;
        height: 15px;
        display: none;
        text-align: center;
        margin-right: 1rem;
      }

      &.editing .editing-icon {
        display: inline-block;
      }

      .MuiFormControl-root {
        flex: 1 1 auto;
      }
    }
  }
`;

export const WritePage: FC<Props> = ({ draft, setDraft }) => {
  const { title: draftTitle, body: draftBody } = draft;

  const [title, setTitle] = useState(draftTitle);
  const [body, setBody] = useState(draftBody);

  const editingTitle = useMemo(() => title !== draftTitle, [title, draftTitle]);
  const editingBody = useMemo(() => body !== draftBody, [body, draftBody]);
  const isDraft = useMemo(() => editingTitle || editingBody, [
    editingTitle,
    editingBody,
  ]);

  useWillUnmount(() => {
    setDraft({ title, body });
  });

  return (
    <StyledWritePage>
      {isDraft && <p>This article is being edited</p>}
      <form>
        <fieldset className={editingTitle ? 'editing' : ''}>
          <span className="editing-icon">!</span>
          <TextField
            id="title-field"
            label="Title"
            error={editingTitle}
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className={editingBody ? 'editing' : ''}>
          <span className="editing-icon">!</span>
          <TextField
            id="body-field"
            label="Body"
            error={editingBody}
            value={body}
            multiline={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBody(e.target.value);
            }}
          />
        </fieldset>
      </form>
    </StyledWritePage>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  draft: getWriteDraft(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setDraft(draft) {
    dispatch(setDraft({ write: draft }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WritePage);
