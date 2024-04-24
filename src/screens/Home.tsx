import { View } from 'react-native';
import Header from '../components/Header';
// import FocusedStatusBar from '../components/FocusedStatusBar';
import { StatusBar } from 'react-native';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';

const Home = () => {
  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1">
        <Header />
        <View className="p-6">
          <Title>Bem vindo, Paulo!</Title>
          <Subtitle>Qual curso você estuda?</Subtitle>
        </View>
        <Separator text="Nível Superior" />
      </View>
    </>
  );
};
export default Home;
