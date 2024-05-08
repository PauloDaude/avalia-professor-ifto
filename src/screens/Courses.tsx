// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar } from 'react-native';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import Loading from '../components/Loading';
import ItemList from '../components/ItemList';

import { RoutesParams } from '../Routes';
import useDataList, { ICourses } from '../hooks/useDataList';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Courses = () => {
  const baseURL = 'http://192.168.0.195:3000';

  const { data, loading, fetchData } = useDataList(baseURL);

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (data: ICourses) => {
    navigation.navigate('Classes', { data });
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
            onEndReached={fetchData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading ? <Loading /> : null}
          />
        </View>
      </View>
    </>
  );
};
export default Courses;
