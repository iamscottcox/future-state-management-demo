import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
  .article-edits-warning .badge.badge-warning {
    margin-right: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;

    .form-group {
      margin-bottom: 1rem;

      .badge.badge-warning {
        margin-left: 0.5rem;
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
      <p style={{ opacity: isDraft ? 1 : 0 }} className="article-edits-warning">
        <Badge variant="warning">Warning</Badge>
        This article is being edited
      </p>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title-input">
            Title
            {editingTitle && <Badge variant="warning">Editing</Badge>}
          </Form.Label>
          <Form.Control
            id="title-input"
            type="text"
            value={title}
            size="lg"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="body-text-area">
            Body
            {editingBody && <Badge variant="warning">Editing</Badge>}
          </Form.Label>
          <Form.Control
            id="body-text-area"
            as="textarea"
            value={body}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBody(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="button">
          Submit
        </Button>
      </Form>
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
