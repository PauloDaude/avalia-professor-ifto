import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataList = <T>(baseURL: string, name: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(baseURL);
      const newData: T[] = response.data[name];

      setData(prevData => [...prevData, ...newData]);
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
