import { Text, View } from 'react-native';
import { cn } from '../lib/utils';

interface CheckboxProps {
  isChecked: boolean;
}

function Checkbox({ isChecked }: CheckboxProps) {
  return (
    <View
      className={cn(
        'w-5 h-5 border-2 border-primary-green rounded flex justify-center items-center',
        {
          'bg-primary-green': isChecked
        }
      )}
    >
      {isChecked && <Text className="text-xs text-primary-white">✓</Text>}
    </View>
  );
}

export { Checkbox };
