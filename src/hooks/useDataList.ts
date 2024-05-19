import { useEffect, useState } from 'react';
import axios from 'axios';
export interface ICourses {
  id: string;
  name: string;
  classes: {
    period_1: IClass[];
    period_2: IClass[];
    period_3: IClass[];
    period_5: IClass[];
    period_6: IClass[];
    period_7: IClass[];
    period_8: IClass[];
    period_9: IClass[];
  };
}
export interface IClass {
  id: number;
  class: string;
  id_professor: number;
  professor: string;
}

export interface IQuestion {
  id: number;
  text: string;
}

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
