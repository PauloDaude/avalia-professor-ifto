import { View, Text } from 'react-native';

interface INote {
  number: number;
}

const Note = ({ number }: INote) => {
  let bgColor = 'bg-primary-black';
  if (number <= 4.4) {
    bgColor = 'bg-primary-red';
  } else if (number <= 5.5) {
    bgColor = 'bg-secondary-black';
  } else if (number <= 10) {
    bgColor = 'bg-secondary-green';
  }
  return (
    <View
      className={`${bgColor} min-w-[50px] min-h-[27px] justify-center items-center rounded-lg`}
    >
      <Text className="text-white font-OpenSansBold text-sm">{number}</Text>
    </View>
  );
};
export default Note;
