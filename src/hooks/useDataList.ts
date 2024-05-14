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

export interface IQuestion {
  id: number;
  text: string;
}

const useDataList = <T>(baseURL: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(baseURL);
      const newData = response.data;

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
