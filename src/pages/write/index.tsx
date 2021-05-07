import { Button, Tag, Form, Input } from 'antd';
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
      <Title level={1}>Write</Title>
      <p style={{ opacity: isDraft ? 1 : 0 }} className="article-edits-warning">
        <Tag color="gold-inverse">Editing</Tag>
        This article is being edited
      </p>

      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          label={
            <span>
              {editingTitle && <Tag color="gold-inverse">Editing</Tag>} Title
            </span>
          }
        >
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <span>
              {editingBody && <Tag color="gold-inverse">Editing</Tag>} Body
            </span>
          }
        >
          <Input.TextArea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setBody(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" block={false}>
            Submit
          </Button>
        </Form.Item>
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
