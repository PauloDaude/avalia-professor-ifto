// import FocusedStatusBar from '../components/FocusedStatusBar';
import { FlatList, View, StatusBar, Text } from 'react-native';
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
import {
  IResponseClasses,
  IResponseFinalResults
} from '../interfaces/interfaces';
import Note from '../components/Note';

type FinalResultsRouteProp = RouteProp<RoutesParams, 'FinalResults'>;

interface FinalResultsProps {
  route: FinalResultsRouteProp;
}

const filterClassesName = (response: AxiosResponse) => {
  // return response.data;
  const data = response.data;
  return {
    idProfessor: data.id_professor,
    classesNames: data.average_by_subject.map((classe: any) => [
      classe.name,
      classe.average_ratingF.toFixed(1)
    ]),
    averageGeneral: data.average_of_averages
  } as IResponseFinalResults;
};

const FinalResults = ({ route }: FinalResultsProps) => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/resultados';

  const { dataProfessor } = route.params;

  const { data, isLoading } = useQuery<IResponseFinalResults>({
    queryKey: ['get-results-professor'],
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
          title="Resultados da matéria"
          subTitle={dataProfessor.name}
          showBack={true}
        />
        <View className="p-6">
          <Title>Resultados das avaliações</Title>
          <Subtitle>Turma de 2024/1</Subtitle>
        </View>
        <Separator text="Matérias" />
        <View className="px-6 pb-2">
          <FlatList
            data={data?.classesNames}
            keyExtractor={(item: any) => item[0]}
            renderItem={({ item }: any) => (
              <ItemList
                text={item[0]}
                note={item[1]}
                onPress={() =>
                  handleItemPress({
                    idProfessor: data!.idProfessor,
                    classesNames: item[0][0]
                  })
                }
              />
            )}
            ListFooterComponent={isLoading ? <Loading /> : null}
          />
        </View>
        <Separator text="Pontuação geral" />
        <View className="px-6 py-4">
          <View className="flex-row justify-between">
            <Text className="font-OpenSansRegular text-base">
              Pontuação final da matéria:
            </Text>
            <Note number={data ? data.averageGeneral.toFixed(1) : 0}></Note>
          </View>
          <Text className="font-OpenSansRegular text-xs text-secondary-black mt-2">
            Obs: O cálculo é a somatória das pontuações das matérias dividido
            pela quantidade de matérias
          </Text>
        </View>
      </View>
    </>
  );
};
export default FinalResults;
