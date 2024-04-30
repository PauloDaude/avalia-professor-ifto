import Courses from './screens/Courses';
import Login from '../src/screens/Login';
import Classes from './screens/Classes';
import { loadFonts } from '../src/styles/fontCustom';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Courses: undefined;
  Classes: { itemName: string };
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const [fontsLoaded] = loadFonts();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName="Courses"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="Classes" component={Classes} />
    </Stack.Navigator>
  );
}
