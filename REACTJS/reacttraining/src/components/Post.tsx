/** @format */
import { memo, useContext, useState, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { ListPostContext } from '../context/ListPostContext';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { EDIT_POST } from './../store/actions';

type InputField = 'body' | 'author';

interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
  name?: string;
}
type Props = {
  // count?: number;
  post: PostModel;
};

const Post = ({ post }: Props) => {
  const [editingField, setEdingField] = useState<InputField | null>(null);
  const [changingInput, setChangingInput] = useState({
    author: post.name,
    body: post.body,
  });
  // const state = useSelector((state: any) => state);
  // console.log('posts state ', state);
  console.log('alo alo ', post.id);
  const dispatch = useDispatch();
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>, field: InputField) => {
      setChangingInput((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
      // submit post
    },
    []
  );
  const hanleSave = useCallback(() => {
    dispatch({
      type: EDIT_POST,
      changingInput,
      postId: post.id,
      userId: post.userId,
    });
    setEdingField(null);
  }, [dispatch, changingInput, post.id, setEdingField, post.userId]);
  return (
    <div>
      <Link to={'post/' + post.id}>
        <strong>{post.title}</strong>
      </Link>
      <div>
        {editingField === 'body' ? (
          <>
            <input
              type='text'
              value={changingInput[editingField]}
              onChange={(e) => handleChangeInput(e, 'body')}
            />
            <button onClick={() => hanleSave()}>Save</button>
          </>
        ) : (
          <p
            onDoubleClick={() => {
              setEdingField('body');
              // handleEdit(post, 'body');
            }}>
            {post.body}
          </p>
        )}
      </div>
      {editingField === 'author' ? (
        <>
          <input
            type='text'
            value={changingInput[editingField]}
            onChange={(e) => handleChangeInput(e, 'author')}
          />
          <button onClick={() => hanleSave()}>Save</button>
        </>
      ) : (
        post.name && (
          <i
            onDoubleClick={() => {
              setEdingField('author');
            }}>
            Author: {post.name}
          </i>
        )
      )}
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.post.body === nextProps.post.body &&
    prevProps.post.name === nextProps.post.name
  );
};

export default memo(Post, arePropsEqual); // shallow compare

// Chanllenge: 15
/**
 * 1. Complete the editing function
 * 2. Handle Deleting function
 */