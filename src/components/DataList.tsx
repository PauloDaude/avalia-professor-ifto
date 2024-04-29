import { View, FlatList } from 'react-native';
import ItemList from './ItemList';
import Loading from './Loading';

interface IDataList {
  data: {
    id: string | number;
    name: string;
  }[];
  loading: boolean;
  loadMore: () => Promise<void>;
}

const DataList = ({ data, loading, loadMore }: IDataList) => {
  return (
    <View className="flex-1 px-6">
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ItemList text={item.name} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <Loading /> : null}
      />
    </View>
  );
};
export default DataList;
