// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { RoutesParams } from '../Routes';
import { IClassesScreen } from '../interfaces/screens';
import axios from 'axios';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import Loading from '../components/Loading';
import ItemList from '../components/ItemList';

const Courses = () => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/cursos';

  const { data, isLoading } = useQuery<IClassesScreen[]>({
    queryKey: ['get-courses'],
    queryFn: () => axios.get(baseURL).then(response => response.data['courses'])
  });

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (dataParams: IClassesScreen) => {
    navigation.navigate('Classes', { dataParams });
  };

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title="Paulo Daúde"
          subTitle="Aluno"
          avatarURL="https://i.ibb.co/XWJ1ML0/unnamed.jpg"
        />
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
            ListFooterComponent={isLoading ? <Loading /> : null}
          />
        </View>
      </View>
    </>
  );
};
export default Courses;
