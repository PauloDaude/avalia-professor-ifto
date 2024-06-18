// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation
} from '@react-navigation/native';
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

type HomeManagerRouteProp = RouteProp<RoutesParams, 'ClassesProfessor'>;

interface HomeManagerProps {
  route: HomeManagerRouteProp;
}

const dataProfessor = {
  id: 2,
  name: 'Edmundo Santos Seifert',
  email: 'edmundo.seifert@ifto.edu.br',
  imageURL: 'https://i.ibb.co/FhPC4b6/edmundo-foto.webp'
};

const filterClassesName = (response: AxiosResponse) => {
  const data = response.data;
  return {
    idProfessor: data.id_professor,
    classesNames: data.average_by_subject.map((classe: any) => classe.name),
    nameProfessor: data.professor
  } as IResponseClasses;
};

const ClassesProfessor = ({ route }: HomeManagerProps) => {
  const { idProfessor } = route.params;

  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/resultados';

  const { data, isLoading } = useQuery<IResponseClasses>({
    queryKey: ['get-classes-professor'],
    queryFn: () =>
      axios
        .get(`${baseURL}/${idProfessor}`)
        .then(response => filterClassesName(response))
  });

  console.log(data);

  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (classeName: IResponseClasses) => {
    navigation.navigate('NotesProfessor', { classeName });
  };

  const handleResultPress = (dataProfessor: any) => {
    navigation.navigate('FinalResults', { dataProfessor });
  };

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header title={data!.nameProfessor!} subTitle="Professor" />
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
          <ItemList
            text="Resultados finais"
            onPress={() => handleResultPress(dataProfessor)}
          />
        </View>
      </View>
    </>
  );
};
export default ClassesProfessor;
