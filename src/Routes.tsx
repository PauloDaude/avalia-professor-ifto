import Courses from './screens/Courses';
import Login from '../src/screens/Login';
import Classes from './screens/Classes';
import Questions from './screens/Questions';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IQuestionsScreen, IClassesScreen } from './interfaces/screens';
import { loadFonts } from '../src/styles/fontCustom';

export type RoutesParams = {
  Courses: undefined;
  Classes: { dataParams: IClassesScreen };
  Questions: { dataParams: IQuestionsScreen };
  Login: undefined;
};

const Stack = createNativeStackNavigator<RoutesParams>();

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
      <Stack.Screen name="Questions" component={Questions} />
    </Stack.Navigator>
  );
}
