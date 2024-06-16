import { View, Text, StatusBar } from 'react-native';

import { ScrollView } from 'react-native-virtualized-view';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';

import { RoutesParams } from '../Routes';
import { RouteProp } from '@react-navigation/native';
import { IAverageNotes, IResponseClasses } from '../interfaces/interfaces';
import { questionsList } from './Questions';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Note from '../components/Note';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

type NotesProfessorRouteProp = RouteProp<RoutesParams, 'NotesProfessor'>;

interface NotesProfessorProps {
  route: NotesProfessorRouteProp;
}

const filterClass = (
  response: AxiosResponse,
  dataParams: IResponseClasses,
  setHasNoData: (value: boolean) => void
): IAverageNotes | {} => {
  try {
    const classData = response.data.average_by_subject.find(
      (response: IAverageNotes) => response.name === dataParams.classesNames[0]
    );
    if (!classData) {
      setHasNoData(true);
      return {};
    } else {
      setHasNoData(false);
      return classData;
    }
  } catch (error) {
    setHasNoData(true);
    return {};
  }
};

const averageClassification = (average: number): string => {
  const classifications: [number, string][] = [
    [2, 'Discordo Totalmente'],
    [3, 'Discordo'],
    [4, 'Discordo Moderadamente'],
    [5, 'Discordo Levemente'],
    [6, 'Neutro'],
    [7, 'Concordo Levemente'],
    [8, 'Concordo Moderadamente'],
    [9, 'Concordo'],
    [10, 'Concordo Totalmente']
  ];

  for (const [limit, classification] of classifications) {
    if (average === 10) return 'Com certeza';
    if (average < limit) {
      return classification;
    }
  }

  return 'Sem dados';
};

const NotesProfessor = ({ route }: NotesProfessorProps) => {
  const baseURL = 'https://felipeoliveira.pythonanywhere.com/api/resultados';
  const { classeName } = route.params;

  const [hasNoData, setHasNoData] = useState(false);

  const { data, isError, isLoading, refetch } = useQuery<IAverageNotes | {}>({
    queryKey: ['get-notes-professor', classeName],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/${classeName.idProfessor}`);
      return filterClass(response, classeName, setHasNoData);
    },
    enabled: false
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, [classeName, refetch]);

  const shouldRender = !isError && !!data;
  const averagesNotes: number[] = data
    ? [
        (data as IAverageNotes).average_rating1,
        (data as IAverageNotes).average_rating2,
        (data as IAverageNotes).average_rating3,
        (data as IAverageNotes).average_rating4,
        (data as IAverageNotes).average_rating5,
        (data as IAverageNotes).average_rating6
      ]
    : [];

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title="Resultados da matéria"
          subTitle={classeName.classesNames[0]}
          showBack={true}
        />
        <View className="p-6">
          <Title>Resultado das avaliações</Title>
          <Subtitle>Turma de 2024/1</Subtitle>
        </View>
        {shouldRender && (
          <View className="px-6 py-4 bg-[#EEEFF1]">
            <View className="flex-row justify-between">
              <Text className="font-OpenSansRegular text-base">
                Pontuação final da matéria:
              </Text>
              <Note
                number={(data as IAverageNotes).average_ratingF.toFixed(1)}
              ></Note>
            </View>
            <Text className="font-OpenSansRegular text-xs w-[80%] text-secondary-black">
              Obs: O cálculo é a somatória das médias dividido por dois
            </Text>
          </View>
        )}
        <ScrollView>
          <View className="flex-1">
            <Separator text={'Perguntas da avaliação'} />
            {isLoading && (
              <View className="px-6 py-4">
                <Loading />
              </View>
            )}
            {hasNoData && isError && (
              <View className="px-6 py-4">
                <Text className="font-OpenSansRegular text-base text-[#9c9c9c]">
                  Nenhum resultado de avaliação encontrado
                </Text>
              </View>
            )}
            {shouldRender &&
              questionsList.map((question, index: number) => {
                return (
                  <View key={index}>
                    <>
                      <View className="px-6 py-6 border-solid border-b border-[#5c5e601a]">
                        <Text className="font-OpenSansRegular text-[10px] text-secondary-black mb-1">{`Pergunta ${
                          index + 1
                        }`}</Text>
                        <Text className="font-OpenSansRegular text-base leading-5">
                          {question.text}
                        </Text>
                        <Text className="font-OpenSansRegular text-[10px] text-secondary-black mb-1 mt-2">
                          Resultado da média
                        </Text>
                        <View className="mt-1 flex-row items-center">
                          <Note number={averagesNotes[index].toFixed(1)} />
                          <Text className="ml-3 font-OpenSansRegular text-sm">
                            {averageClassification(averagesNotes[index])}
                          </Text>
                        </View>
                      </View>
                    </>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default NotesProfessor;
