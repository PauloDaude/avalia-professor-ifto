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
import { IClass, IResponseClasses } from '../interfaces/interfaces';

const dataProfessor = {
  id: 4,
  name: 'Edmundo Santos Seifert',
  email: 'edmundo.seifert@ifto.edu.br',
  imageURL: 'https://i.ibb.co/FhPC4b6/edmundo-foto.webp'
};

const filterClassesName = (response: AxiosResponse) => {
  const data = response.data;
  return {
    idProfessor: data.id_professor,
    classesNames: data.average_by_subject.map((classe: any) => classe.name)
  } as IResponseClasses;
};

const ClassesProfessor = () => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/resultados';

  const { data, isLoading } = useQuery<IResponseClasses>({
    queryKey: ['get-classes-professor'],
    queryFn: () =>
      axios
        .get(`${baseURL}/${dataProfessor.id}`)
        .then(response => filterClassesName(response))
  });

  console.log(data);

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (classeName: IResponseClasses) => {
    navigation.navigate('NotesProfessor', { classeName });
  };

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
            data={data?.classesNames}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <ItemList
                text={item}
                onPress={() =>
                  handleItemPress({
                    idProfessor: data!.idProfessor,
                    classesNames: [item]
                  })
                }
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
