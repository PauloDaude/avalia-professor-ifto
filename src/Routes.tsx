import Courses from './screens/HomeStudent';
import Login from '../src/screens/Login';
import Classes from './screens/Classes';
import Questions from './screens/Questions';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IQuestionsScreen, IClassesScreen } from './interfaces/screens';
import { loadFonts } from '../src/styles/fontCustom';
import ClassesProfessor from './screens/HomeProfessor';
import NotesProfessor from './screens/NotesProfessor';
import { IClass, IResponseClasses } from './interfaces/interfaces';
import FinalResults from './screens/FinalResults';

export type RoutesParams = {
  Courses: undefined;
  Classes: { dataParams: IClassesScreen };
  Questions: { dataParams: IQuestionsScreen };
  ClassesProfessor: undefined;
  NotesProfessor: { classeName: IResponseClasses };
  FinalResults: { dataProfessor: any };
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
      initialRouteName="ClassesProfessor"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="Classes" component={Classes} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen name="ClassesProfessor" component={ClassesProfessor} />
      <Stack.Screen name="NotesProfessor" component={NotesProfessor} />
      <Stack.Screen name="FinalResults" component={FinalResults} />
    </Stack.Navigator>
  );
}
