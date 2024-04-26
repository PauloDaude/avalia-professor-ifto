import { FlatList, View } from 'react-native';
import Header from '../components/Header';
// import FocusedStatusBar from '../components/FocusedStatusBar';
import { StatusBar } from 'react-native';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import ItemList from '../components/ItemList';

interface IDataList {
  id: string;
  professor: string;
  class: string;
  note: number;
}

const dataList: IDataList[] = [
  {
    id: '1',
    professor: 'Prof. Lucas do Carmo Gonçalo',
    class: 'Fundamentos da Matemática',
    note: 28
  },
  {
    id: '2',
    professor: 'Prof. Lucas do Carmo Gonçalo',
    class: 'Fundamentos da Matemática de são josé dos campos',
    note: 6
  },
  {
    id: '3',
    professor: 'Prof. Lucas do Carmo Gonçalo',
    class: 'Fundamentos da Matemática',
    note: 6
  }
];

const Home = () => {
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
        <View className="px-6">
          <FlatList
            data={dataList}
            renderItem={({ item }) => (
              <ItemList
                text={item.class}
                // subText={item.professor}
                // note={item.note}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </>
  );
};
export default Home;
