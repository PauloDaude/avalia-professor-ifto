import { View, Text } from 'react-native';

interface ISeparator {
  text: string;
}

const Separator = ({ text }: ISeparator) => {
  return (
    <View className="py-3 px-6 border-t-2 border-secondary-green bg-[#EEEFF1]">
      <Text className="text-sm font-OpenSansBold text-secondary-green">
        {text}
      </Text>
    </View>
  );
};
export default Separator;
