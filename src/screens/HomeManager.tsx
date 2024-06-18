// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { RoutesParams } from '../Routes';
import axios, { AxiosResponse } from 'axios';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import Loading from '../components/Loading';
import ItemList from '../components/ItemList';
import { IResponseClasses } from '../interfaces/interfaces';

const dataManager = {
  name: 'Jarles Noleto',
  email: 'jarles@ifto.edu.br'
};

const HomeManager = () => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/professores';

  const { data, isLoading } = useQuery<
    { id_professor: number; professor: string }[]
  >({
    queryKey: ['get-classes-professors'],
    queryFn: () =>
      axios.get(baseURL).then(response => response.data['teachers'])
  });

  // console.log(data);

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (idProfessor: { idProfessor: number }) => {
    navigation.navigate('ClassesProfessor', idProfessor);
  };

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title={dataManager.name}
          subTitle="Professor"
          avatarURL="dasdasd"
        />
        <View className="p-6">
          <Title>Bem vindo, {dataManager.name}!</Title>
          <Subtitle>Veja os resultados das avaliações</Subtitle>
        </View>
        <Separator text="Professores" />
        <View className="px-6 pb-2">
          <FlatList
            data={data}
            keyExtractor={item => item.id_professor.toString()}
            renderItem={({ item }) => (
              <ItemList
                text={item.professor}
                onPress={() =>
                  handleItemPress({
                    idProfessor: item.id_professor
                  })
                }
              />
            )}
            ListFooterComponent={isLoading ? <Loading /> : null}
          />
        </View>
      </View>
    </>
  );
};
export default HomeManager;
