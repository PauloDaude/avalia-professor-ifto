import { RoutesParams } from '../Routes';
import { useState } from 'react';

import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { INote, IFormData, IQuestion } from '../interfaces/interfaces';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import Question from '../components/Question';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { Checkbox } from '../components/Checkbox';

type QuestionsRouteProp = RouteProp<RoutesParams, 'Questions'>;

interface IQuestionsRoute {
  route: QuestionsRouteProp;
}

const questions: IQuestion[] = [
  {
    id: 1,
    text: 'O docente apresentou seu plano de ensino (PLANEJAMENTO) no início do semestre ou ano letivo, indicando a ementa, competências e habilidades, recursos didáticos que serão utilizados, formas de avaliações, referências bibliográficas?'
  },
  {
    id: 2,
    text: 'O docente apresenta uma POSTURA adequada ao cargo e responsabilidade que ocupa?'
  },
  {
    id: 3,
    text: 'O docente é ASSÍDUO, ou seja, não falta às aulas e quando falta, apresenta justificativa e promove suas devidas reposições ou anteposições?'
  },
  {
    id: 4,
    text: 'O docente é PONTUAL, ou seja, não chega atrasado ou libera a turma mais cedo?'
  },
  {
    id: 5,
    text: 'O docente na REALIZAÇÃO de suas aulas procura contextualizar os conteúdos trabalhados; domina o conteúdo; possui fala (dicção) clara, coerente e fluente?'
  },
  {
    id: 6,
    text: 'O docente nas AVALIAÇÕES mostra coerência entre o que foi ensinado e o que é exigido do estudante, entrega as avaliações e comenta os resultados, auxilia no processo de recuperação daqueles conteúdos não apreendidos?'
  }
];

const Questions = ({ route }: IQuestionsRoute) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState<INote>({});

  const { dataParams } = route.params;

  const handleFormDataChange = (questionId: number, selectedOption: number) => {
    setFormData(prevState => ({ ...prevState, [questionId]: selectedOption }));
  };

  const handleSubmitForm = () => {
    const resultForm: IFormData = {
      IDMateria: dataParams.id,
      IDProfessor: dataParams.id_professor,
      Nota1: formData[1],
      Nota2: formData[2],
      Nota3: formData[3],
      Nota4: formData[4],
      Nota5: formData[5],
      Nota6: formData[6]
    };
    console.log(resultForm);
  };
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
          {!questions ? (
            <Loading />
          ) : (
            questions.map((question, index: number) => (
              <View key={index}>
                <Separator text={`Pergunta ${index + 1}*`} />
                <View className="px-6 py-4">
                  <Question
                    question={question}
                    selectedOption={formData[question.id]}
                    onOptionSelect={(selectedOption: number) =>
                      handleFormDataChange(question.id, selectedOption)
                    }
                  />
                </View>
              </View>
            ))
          )}
          <Separator text="Fim das perguntas" />
          <View className="px-6 py-4 gap-y-6">
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <Checkbox isChecked={isChecked} />
                <Text className="font-OpenSansRegular text-base leading-5 mx-4">
                  Confirmo que respondi as perguntas de forma sincera
                </Text>
              </View>
            </TouchableOpacity>
            <Button
              text="Enviar respostas"
              disabled={!isChecked}
              onPress={handleSubmitForm}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Questions;
