// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar } from 'react-native';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import Loading from '../components/Loading';
import ItemList from '../components/ItemList';

import { RoutesParams } from '../Routes';
import useDataList from '../hooks/useDataList';
import { IClassesScreen } from '../interfaces/screens';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Courses = () => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/cursos';

  const { data, loading } = useDataList<IClassesScreen>(baseURL, 'courses');

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (dataParams: IClassesScreen) => {
    navigation.navigate('Classes', { dataParams });
  };

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header title="Paulo Daúde" subTitle="Aluno" showAvatar={true} />
        <View className="p-6">
          <Title>Bem vindo, Paulo!</Title>
          <Subtitle>Qual curso você estuda?</Subtitle>
        </View>
        <Separator text="Nível Superior" />
        <View className="flex-1 px-6">
          <FlatList
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ItemList
                text={item.name}
                onPress={() => handleItemPress(item)}
              />
            )}
            ListFooterComponent={loading ? <Loading /> : null}
          />
        </View>
      </View>
    </>
  );
};
export default Courses;
