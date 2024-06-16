import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBarProps } from 'expo-status-bar';

function FocusedStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusedStatusBar;
