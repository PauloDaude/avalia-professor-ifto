import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface IButton extends TouchableOpacityProps {
  text: string;
  variant?: 'login' | undefined;
  disabled?: boolean;
}

const Button = ({ variant, text, disabled, ...rest }: IButton) => {
  let bgColor = disabled
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
        <Text className="font-OpenSansBold text-white text-sm">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
