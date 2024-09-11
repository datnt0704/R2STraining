/** @format */

import { fetchData } from '../utils/fetchData';
import { useState, useEffect } from 'react';

const useApi = (url: string, initialData?: any) => {
  const [data, setData] = useState(initialData); // internal state
  useEffect(() => {
    const fetchDataDetail = async () => {
      try {
        const dataReponse = await fetchData(url);
        setData(dataReponse);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchDataDetail();
  }, []);

  return { data, setData };
};

export default useApi;
