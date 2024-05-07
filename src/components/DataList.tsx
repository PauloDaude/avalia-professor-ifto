import { View, FlatList } from 'react-native';
import ItemList from './ItemList';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Routes';
import { NavigationProp } from '@react-navigation/native';
import { ICourses } from '../hooks/useDataList';

interface IDataList {
  data: ICourses[];
  loading: boolean;
  loadMore: () => Promise<void>;
}

const DataList = ({ data, loading, loadMore }: IDataList) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleItemPress = (itemName: string) => {
    navigation.navigate('Classes', { itemName });
  };
  return (
    <View className="flex-1 px-6">
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ItemList
            text={item.name}
            onPress={() => handleItemPress(item.name)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <Loading /> : null}
      />
    </View>
  );
};
export default DataList;
