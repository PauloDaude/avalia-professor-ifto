import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataList = <T>(baseURL: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/courses/?_page=${page}`);
      const newData = response.data.data;
      console.log(newData);
      if (!newData) {
        setHasMore(false);
        return;
      }
      setData(prevData => [...prevData, ...newData]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log('Erro ao buscar os dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetchData };
};

export default useDataList;
