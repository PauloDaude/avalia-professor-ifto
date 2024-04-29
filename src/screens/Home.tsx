import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
// import FocusedStatusBar from '../components/FocusedStatusBar';
import { StatusBar } from 'react-native';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import axios from 'axios';
import DataList from '../components/DataList';

interface IData {
  id: string;
  name: string;
}

const Home = () => {
  const baseURL = 'https://rickandmortyapi.com/api';

  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/character?page=${page}`);
      setData(prevData => [...prevData, ...response.data.results]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log('Erro ao buscar os dados:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header />
        <View className="p-6">
          <Title>Bem vindo, Paulo!</Title>
          <Subtitle>Qual curso você estuda?</Subtitle>
        </View>
        <Separator text="Nível Superior" />
        <DataList data={data} loading={loading} loadMore={loadMore} />
      </View>
    </>
  );
};
export default Home;
