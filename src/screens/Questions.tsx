import { View, Text, StatusBar, FlatList } from 'react-native';
import Header from '../components/Header';
import { RouteProp } from '@react-navigation/native';
import { RoutesParams } from '../Routes';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import useDataList, { IQuestion } from '../hooks/useDataList';
import Question from '../components/Question';
import { ScrollView } from 'react-native-virtualized-view';
import Loading from '../components/Loading';

type QuestionsRouteProp = RouteProp<RoutesParams, 'Questions'>;

interface QuestionsProps {
  route: QuestionsRouteProp;
}

const Questions = ({ route }: QuestionsProps) => {
  const baseURLQuestions = 'http://192.168.0.195:3000/questions';

  const { data: dataQuestions, loading } =
    useDataList<IQuestion>(baseURLQuestions);
  const { dataParams } = route.params;
  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header title="Avaliação" subTitle={dataParams.class} showBack={true} />
        <View className="p-6">
          <Title>Responda todas as questões</Title>
          <Subtitle>De forma sincera</Subtitle>
        </View>
        <ScrollView>
          <View className="px-6 pb-3">
            <Text className="font-OpenSansSemiBold text-sm text-secondary-green">
              {dataParams.professor}
            </Text>
          </View>
          {loading ? (
            <Loading />
          ) : (
            dataQuestions.map((question, index: number) => (
              <View key={index}>
                <Separator text={`Pergunta ${index + 1}*`} />
                <View className="px-6 py-4">
                  <Question question={question} />
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
};
export default Questions;
