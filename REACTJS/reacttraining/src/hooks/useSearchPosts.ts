/** @format */
import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { PostModel } from "../types/post";

export const useSearchPost = (postIds: PostModel["id"][], postsData: { [key: number]: PostModel }) => {
  const [searchText, setSearchText] = useState("");

  const debounceSearch = useMemo(() => {
    return debounce((text: string) => setSearchText(text), 300);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchText) return postIds;
    return postIds.filter((id: PostModel["id"]) => {
      const title = postsData[id].title.toLowerCase();
      return title.includes(searchText.toLowerCase());
    });
  }, [postIds, postsData, searchText]);

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return { searchResults, debounceSearch };
};

export default useSearchPost;
