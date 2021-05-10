import { Button, Form, Icon, Message } from 'semantic-ui-react';
import Title from 'antd/lib/typography/Title';
import { useWillUnmount } from 'beautiful-react-hooks';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { getWriteDraft } from 'src/getters/drafts';

import { AppDispatch, AppState } from 'src/state';
import { setDraft } from 'src/state/slices/drafts';

interface StateProps {
  draft: AppState['drafts']['write'];
}
interface DispatchProps {
  setDraft: (draft: AppState['drafts']['write']) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

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
    <div className="write-page">
      <h1>Write</h1>

      <Message
        warning
        hidden={!isDraft}
        header="This following parts of this article are being edited:"
        list={[editingTitle && 'Title', editingBody && 'Body']}
      />

      <Form>
        <Form.Field>
          <label>
            {editingTitle && <Icon name="warning circle" color="yellow" />}
            Title
          </label>
          <input
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>
            {editingBody && <Icon name="warning circle" color="yellow" />} Body
          </label>
          <textarea
            value={body}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setBody(e.target.value);
            }}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
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
