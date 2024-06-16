import { View, Text, StatusBar, FlatList } from 'react-native';

import { ScrollView } from 'react-native-virtualized-view';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';

import { RoutesParams } from '../Routes';
import { RouteProp } from '@react-navigation/native';
import { IQuestionsScreen } from '../interfaces/screens';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ItemList from '../components/ItemList';
import { IClass } from '../interfaces/interfaces';

type ClassesRouteProp = RouteProp<RoutesParams, 'Classes'>;

interface ClassesProps {
  route: ClassesRouteProp;
}

const Classes = ({ route }: ClassesProps) => {
  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (dataParams: IQuestionsScreen) => {
    navigation.navigate('Questions', { dataParams });
  };

  const { dataParams } = route.params;
  const periodsList: IClass[][] = Object.values(dataParams.classes);

  const isVoidData = () => {
    const booleanList = Object.values(dataParams.classes).filter(test =>
      test.length !== 0 ? false : true
    );
    if (booleanList.length === 0) {
      return true;
    }
    return false;
  };

  const currentMonth = new Date().getMonth();
  const currentSemester: string = currentMonth <= 5 ? 'first' : 'second';

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title="Matérias do curso"
          subTitle={dataParams.name}
          avatarURL="https://i.ibb.co/XWJ1ML0/unnamed.jpg"
          showBack={true}
        />
        <View className="p-6">
          <Title>Escolha a disciplina</Title>
          <Subtitle>Estão separadas por período</Subtitle>
        </View>
        <ScrollView>
          <View className="flex-1">
            {isVoidData() && (
              <Text className="py-3 px-6 bg-[#EEEFF1] text-sm font-OpenSansRegular text-secondary-green">
                Nenhuma matéria encontrada
              </Text>
            )}
            {periodsList.map((period: IClass[], index: number) => {
              const isOddIndex = (index + 1) % 2 !== 0;
              const shouldRender =
                (currentSemester === 'first' && isOddIndex) ||
                (currentSemester === 'second' && !isOddIndex);
              return (
                <View key={index}>
                  {shouldRender && (
                    <>
                      <Separator text={`${index + 1}º Período`} />
                      {period.length === 0 && (
                        <View className="px-6 py-4">
                          <Text className="font-OpenSansRegular text-base text-[#9c9c9c]">
                            Nenhuma matéria encontrada
                          </Text>
                        </View>
                      )}
                      <View className="px-6">
                        <FlatList
                          data={period}
                          keyExtractor={item => String(item.id)}
                          renderItem={({ item }) => (
                            <ItemList
                              text={item.class}
                              subText={item.professor}
                              onPress={() => handleItemPress(item)}
                            />
                          )}
                        />
                      </View>
                    </>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Classes;
