import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface IHeader {
  title: string;
  subTitle: string;
  avatarURL?: string;
  showBack?: boolean;
}

const Header = ({ title, subTitle, avatarURL, showBack = false }: IHeader) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-row w-full h-auto justify-between px-6 py-2 bg-primary-green items-center">
      <View className="flex-row items-center gap-4 flex-1">
        {showBack && (
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
        )}
        <View>
          <Text className="font-OpenSansSemiBold text-xl text-primary-white">
            {title}
          </Text>
          <Text className="font-OpenSansLight text-sm text-primary-white leading-4">
            {subTitle}
          </Text>
        </View>
      </View>
      {!!avatarURL && (
        <Avatar className="w-10 h-10">
          <AvatarImage source={{ uri: avatarURL }} />
          <AvatarFallback>PD</AvatarFallback>
        </Avatar>
      )}
    </View>
  );
};
export default Header;
