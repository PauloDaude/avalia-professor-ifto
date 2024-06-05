// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { RoutesParams } from '../Routes';
import { IClassesScreen } from '../interfaces/screens';
import axios, { AxiosResponse } from 'axios';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import Loading from '../components/Loading';
import ItemList from '../components/ItemList';
import { IClass } from '../interfaces/interfaces';

const dataProfessor = {
  id: 2,
  name: 'Edmundo Santos Seifert',
  email: 'edmundo.seifert@ifto.edu.br',
  imageURL: 'https://i.ibb.co/FhPC4b6/edmundo-foto.webp'
};

const filterClasses = (response: AxiosResponse) => {
  const professorsClasses = response.data['courses'];
  return professorsClasses.flatMap((professorClass: IClassesScreen) => {
    const classes = Object.values(professorClass.classes).flat();
    return classes.filter(
      (period: IClass) => period.id_professor === dataProfessor.id
    );
  });
};

const ClassesProfessor = () => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/cursos';

  const { data, isLoading } = useQuery<IClass[]>({
    queryKey: ['get-classes-professor'],
    queryFn: () => axios.get(baseURL).then(response => filterClasses(response))
  });

  console.log(data);

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  // const handleItemPress = (dataParams: IClass) => {
  //   navigation.navigate('', { dataParams });
  // };

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title={dataProfessor.name}
          subTitle="Professor"
          avatarURL={dataProfessor.imageURL}
        />
        <View className="p-6">
          <Title>Bem vindo, Edmundo!</Title>
          <Subtitle>Veja os resultados das avaliações</Subtitle>
        </View>
        <Separator text="Matérias" />
        <View className="px-6 pb-2">
          <FlatList
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ItemList
                text={item.class}
                // onPress={() => handleItemPress(item)}
              />
            )}
            ListFooterComponent={isLoading ? <Loading /> : null}
          />
        </View>
        <Separator text="Pontuação final" />
        <View className="px-6">
          <ItemList text="Resultados finais" onPress={() => {}} />
        </View>
      </View>
    </>
  );
};
export default ClassesProfessor;
