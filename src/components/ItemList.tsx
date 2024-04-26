import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Note from './Note';

interface ItemListProps extends TouchableOpacityProps {
  text: string;
  subText?: string;
  note?: number;
}

const ItemList = ({ text, subText, note, ...rest }: ItemListProps) => {
  return (
    <TouchableOpacity
      {...rest}
      className="w-full items-start py-5 border-solid border-b border-[#5c5e601a]"
      activeOpacity={0.4}
    >
      {subText && (
        <Text className="font-OpenSansRegular text-[10px] text-secondary-black">
          {subText}
        </Text>
      )}
      <View className="flex-row w-full items-center justify-between ">
        <Text className="font-OpenSansRegular text-base text-primary-black leading-5 flex-1">
          {text}
        </Text>
        <View className="flex-row items-center justify-end gap-x-2 pr-2 ml-3">
          {note && <Note number={note} />}
          <AntDesign name="right" size={16} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemList;
