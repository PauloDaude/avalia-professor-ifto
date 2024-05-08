import { View, Text, StatusBar, FlatList } from 'react-native';

import { ScrollView } from 'react-native-virtualized-view';

import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';

import { RoutesParams } from '../Routes';
import { RouteProp } from '@react-navigation/native';
import { IClass, ICourses } from '../hooks/useDataList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ItemList from '../components/ItemList';

type ClassesRouteProp = RouteProp<RoutesParams, 'Classes'>;

interface ClassesProps {
  route: ClassesRouteProp;
}

const Classes = ({ route }: ClassesProps) => {
  const navigation = useNavigation<NavigationProp<RoutesParams>>();
  const handleItemPress = (data: ICourses) => {
    navigation.navigate('Classes', { data });
  };

  const { data } = route.params;
  const periodsList: IClass[][] = Object.values(data.classes);
  // console.log(Object.values(data.classes));

  const isVoidData = () => {
    const teste = Object.values(data.classes).filter(test =>
      test.length !== 0 ? false : true
    );
    if (teste.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header
          title="Matérias do curso"
          subTitle={data.name}
          showBack={true}
        />
        <View className="p-6 shadow-md">
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
            {periodsList.map((period: IClass[], index: number) => (
              <View key={index}>
                {period.length > 0 && (
                  <>
                    <Separator
                      text={`${
                        (index + 1) % 2 == 0 ? index + 2 : index + 1
                      }º Período`}
                    />
                    <View className="px-6">
                      <FlatList
                        data={period}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                          <ItemList
                            text={item.class}
                            subText={item.professor}
                            // onPress={() => handleItemPress(item)}
                          />
                        )}
                      />
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Classes;
