/** @format */

import { useState, lazy, Suspense, useEffect } from "react";
import Input from "../components/Input";
import { PostModel } from "./../types/post";
import { Navigate } from "react-router-dom";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { useSearchPost } from "../hooks/useSearchPost";

const Post = lazy(() => import("../components/Post"));

function ListPosts() {
  const { isLoggedIn, postIds, postsData, userData, isLoading } =
    useFetchPosts();

  const { searchResults, debounceSearch } = useSearchPost(postIds, postsData);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (postIds.length === 0 && isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <>
      <Input label="Search" onChange={(e) => debounceSearch(e.target.value)} />
      <Suspense fallback={<p>Loading list ...</p>}>
        {searchResults.map((id: PostModel["id"]) => {
          const post = postsData[id];
          const postWithUser = post
            ? { ...post, name: userData[post.userId].name }
            : null;
          return postWithUser ? (
            <Post
              key={postWithUser.id} // 1, 2, 3 1,
              post={postWithUser}
            />
          ) : null;
        })}
      </Suspense>
    </>
  );
}

export default ListPosts;
