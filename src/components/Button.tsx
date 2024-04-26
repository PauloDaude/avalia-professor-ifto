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
}

const Button = ({ variant, text, ...rest }: IButton) => {
  let bgColor = variant ? 'bg-[#4285F4]' : 'bg-primary-green';
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      className={`w-full ${bgColor} rounded-lg items-center justify-center`}
    >
      <View className="flex-row w-full items-center justify-center p-4 gap-4">
        {variant && <FontAwesome6 name="google" size={18} color="white" />}
        <Text className="font-OpenSansBold text-white text-sm">
          {variant ? 'Continuar com Google' : text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default Button;
