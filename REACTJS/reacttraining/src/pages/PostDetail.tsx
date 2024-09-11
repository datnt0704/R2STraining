/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';
import useApi from './../hooks/useApi';
import { PostModel } from './../types/post';

const PostDetail = () => {
  const { postId } = useParams() || {};
  const { data: post, setData: setPost } = useApi('posts/' + postId, null);
  // custom hook
  /**
   * 1. re-use hook
   * 2. clean code
   */

  if (!post) {
    return null;
  }
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;
