/** @format */

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';
import Post from '../components/Post';
import { fetchData } from '../utils/fetchData';
import { PostModel } from './../types/post';
import useApi from './../hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchListPosts } from './../store/reducers/postsReducer';
import { fetchListUsers } from '../store/reducers/usersReducer';
import { AppDispatch } from './../store';

const compute = () => {
  let i = 0;
  let total = 0;
  while (i < 1000000000) {
    total += i;
    i++;
  }
  return total;
};

function ListPosts() {
  // const [postsData, setPostsData] = useState<PostModel[]>(posts); //
  // const { data: postsData, setData: setPostsData } = useApi('/posts', []);
  const [count, setCount] = useState(0); // asynchronous  (batch update)
  const [time, setTime] = useState(0);
  const totalTitleLength = useRef<number>(0); // ref
  const dispatch = useDispatch<AppDispatch>();
  const { auth, posts, users } = useSelector((state: any) => state);
  const postIds = posts.ids ?? [];
  const postsData = posts.data || {};
  const userData = users.data;

  useEffect(() => {
    dispatch(fetchListPosts());
    dispatch(fetchListUsers());
  }, [dispatch]);

  const addPost = useCallback(() => {
    // setPostsData((prevPosts: any) => {
    //   if (prevPosts) {
    //     return [...prevPosts, post1];
    //   }
    //   return [post1];
    // });
    if (totalTitleLength.current != null) {
      // null, undefined
      // totalTitleLength.current += post1.title.length;
    }
  }, []);

  const handleIncrease = useCallback(() => {
    // re-render 1 time: batchupdate
    setCount(count + 1); // count 1: 2
    // setCount(count + 1);
    setCount((prevCount) => prevCount + 1); // count 3
    setTime(time + Date.now());
  }, [count, time, setCount, setTime]);

  console.log('re-render LIst post count ', count);

  if (!auth.isLoggedIn) {
    return <Navigate to='/login' replace={true} />;
  }

  if (posts.loading === 'loading') {
    return <p> loading ...</p>;
  }

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      {/* <p style={{ color: 'green' }}>{total}</p> */}
      <button onClick={addPost}>Add post</button>
      {postIds.map((id: PostModel['id']) => {
        const post = postsData[id];
        const postWithUser = post
          ? { ...post, name: userData[post.userId].name }
          : null;
        return postWithUser ? (
          <Post
            key={postWithUser.id} // 1, 2, 3 1,
            postDetail={{ post: postWithUser, count: postsData.length }}
            // title={post.title}
            // body={post.body}
            // id={post.id}
            // count={postsData.length}
          />
        ) : null;
      })}
    </>
  );
}

export default ListPosts;