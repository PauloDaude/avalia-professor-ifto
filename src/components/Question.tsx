import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { IQuestion } from '../hooks/useDataList';

interface IQuestionProps {
  question: IQuestion;
}

const Question = ({ question }: IQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number>();

  const options = [
    { value: 1, text: '1 - Discordo Totalmente' },
    { value: 2, text: '2 - Discordo' },
    { value: 3, text: '3 - Discordo Moderadamente' },
    { value: 4, text: '4 - Discordo Levemente' },
    { value: 5, text: '5 - Neutro' },
    { value: 6, text: '6 - Concordo Levemente' },
    { value: 7, text: '7 - Concordo Moderadamente' },
    { value: 8, text: '8 - Concordo' },
    { value: 9, text: '9 - Concordo Totalmente' },
    { value: 10, text: '10 - Com certeza' }
  ];

  return (
    <View>
      <Text className="font-OpenSansRegular text-base leading-5">
        {question.text}
      </Text>
      <View className="w-full py-2">
        {options.map(option => (
          <TouchableOpacity
            onPress={() => setSelectedOption(option.value)}
            activeOpacity={0.7}
            key={option.value}
          >
            <View className="flex-row w-full items-center ml-[-8px]">
              <RadioButton
                key={option.value}
                value={String(option.value)}
                status={
                  selectedOption === option.value ? 'checked' : 'unchecked'
                }
                color="#257C2E"
                onPress={() => setSelectedOption(option.value)}
              />
              <Text className="font-OpenSansRegular text-sm">
                {option.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Question;
