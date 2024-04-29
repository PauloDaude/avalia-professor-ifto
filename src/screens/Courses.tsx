import { View, Text, StatusBar } from 'react-native';
import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import DataList from '../components/DataList';

const Courses = () => {
  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title="Matérias do curso"
          subTitle="Sistemas de Informação"
          showBack={true}
        />
        <View className="p-6">
          <Title>Escolha a disciplina</Title>
          <Subtitle>Estão separadas por período</Subtitle>
        </View>
        <Separator text="Nível Superior" />
        {/* <DataList data={data} loading={loading} loadMore={loadMore} /> */}
      </View>
    </>
  );
};
export default Courses;
