import { ActivityIndicator, View } from 'react-native';

function Loading() {
  return (
    <View className="p-5">
      <ActivityIndicator size={25} color="#000000" />
    </View>
  );
}
export default Loading;
