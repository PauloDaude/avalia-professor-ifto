import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

interface IButton extends TouchableOpacityProps {
  text: string;
  variant?: 'login' | undefined;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({ variant, text, disabled, isLoading, ...rest }: IButton) => {
  let bgColor =
    disabled || isLoading
      ? 'bg-[#257c2e55]'
      : variant
      ? 'bg-[#4285F4]'
      : 'bg-primary-green';
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      disabled={disabled}
      className={`w-full ${bgColor} rounded-lg items-center justify-center`}
    >
      <View className="flex-row w-full items-center justify-center p-4 gap-4">
        {variant && <FontAwesome6 name="google" size={18} color="white" />}
        <Text className="font-OpenSansBold text-white text-sm text-center justify-center items-center">
          {isLoading ? <ActivityIndicator size={20} color="#257c2e" /> : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
