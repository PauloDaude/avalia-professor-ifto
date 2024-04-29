import Home from '../src/screens/Home';
import Login from '../src/screens/Login';
import { loadFonts } from '../src/styles/fontCustom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}