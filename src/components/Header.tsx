import { View, Text } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
const Header = () => {
  return (
    <View className="flex-row w-full h-auto justify-between px-6 py-2 bg-primary-green items-center">
      <View>
        <Text className="font-OpenSansSemiBold text-xl text-primary-white">
          Paulo Daúde
        </Text>
        <Text className="font-OpenSansLight text-sm text-primary-white leading-4">
          Aluno
        </Text>
      </View>
      <Avatar className="w-10 h-10 ">
        <AvatarImage source={{ uri: 'https://i.ibb.co/XWJ1ML0/unnamed.jpg' }} />
        <AvatarFallback>PD</AvatarFallback>
      </Avatar>
    </View>
  );
};
export default Header;
