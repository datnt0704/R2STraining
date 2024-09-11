/** @format */
import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ListPostContext } from '../context/ListPostContext';

interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
  name?: string;
}
type Props = {
  // count?: number;
  postDetail: {
    post: PostModel;
    count?: number;
  };
};

const Post = ({ postDetail }: Props) => {
  // console.log('post render ', postDetail.post.id);
  const contextData = useContext(ListPostContext);
  // console.log('contextData ', contextData);
  return (
    <div>
      <Link to={'post/' + postDetail.post.id}>
        <strong>{postDetail.post.title}</strong>
      </Link>
      <p>{postDetail.post.body}</p>
      {postDetail.post.name && <i>Author: {postDetail.post.name}</i>}
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.postDetail.post.title === nextProps.postDetail.post.title;
};

export default memo(Post, arePropsEqual); // shallow compare
