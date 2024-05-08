import { useEffect, useState } from 'react';
import axios from 'axios';
export interface ICourses {
  id: string;
  name: string;
  classes: {
    period_one: IClass[];
    period_three: IClass[];
    period_five: IClass[];
    period_seven: IClass[];
  };
}
export interface IClass {
  id: number;
  class: string;
  professor: string;
}

const useDataList = (baseURL: string) => {
  const [data, setData] = useState<ICourses[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/courses/?_page=${page}`);
      const newData = response.data.data;
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
