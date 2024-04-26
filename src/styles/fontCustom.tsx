import { useFonts } from 'expo-font';

export function loadFonts() {
  return useFonts({
    OpenSansLight: require('../../assets/fonts/OpenSans-Light.ttf'),
    OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf'),
    OpenSansSemiBold: require('../../assets/fonts/OpenSans-SemiBold.ttf'),
    OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf')
  });
}
