import { View, Text, StatusBar } from 'react-native';
import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import DataList from '../components/DataList';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Routes';

type ClassesRouteProp = RouteProp<RootStackParamList, 'Classes'>;

interface ClassesProps {
  route: ClassesRouteProp;
}

const Classes = ({ route }: ClassesProps) => {
  const { itemName } = route.params;

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header title="Matérias do curso" subTitle={itemName} showBack={true} />
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
export default Classes;
