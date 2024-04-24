import { Text, View } from 'react-native';
import Home from './src/screens/Home';
import { loadFonts } from './src/font/fontCustom';

export default function App() {
  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className="flex-1 justify-center items-center">
      <Home />
    </View>
  );
}
