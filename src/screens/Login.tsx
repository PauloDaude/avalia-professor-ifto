import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  Linking,
  ToastAndroid
} from 'react-native';
import Button from '../components/Button';

const openUrl = async (url: string) => {
  if (await Linking.canOpenURL(url)) {
    await Linking.openURL(url);
  } else {
    ToastAndroid.show("Can't open this URL", ToastAndroid.SHORT);
  }
};

const Login = () => {
  return (
    <ImageBackground
      source={require('../../assets/login-background-image.png')}
      resizeMode="cover"
      className="flex-1"
    >
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View className="flex-1 mt-6">
        <View className="w-full items-center mt-10">
          <Image
            source={require('../../assets/logo-colorida-vertical.png')}
            className="max-w-[152px] max-h-[182px]"
          />
        </View>
        <View className="flex-1 justify-end px-5">
          <Text className="font-OpenSansBold text-3xl text-primary-white text-center">
            Avalie o desempenho do seu professor
          </Text>
          <Text className="font-OpenSansRegular text-base text-primary-white text-center mt-5">
            Aplicativo destinado a fazer avaliações dos professores da
            instituição através de questinários
          </Text>
          <Button
            variant="login"
            text="Continuar com Google"
            className="mt-12"
            onPress={() =>
              openUrl('https://felipeoliveira.pythonanywhere.com/login')
            }
          />
        </View>
        <Text className="text-base font-OpenSansLight text-secondary-black text-center mt-12 mb-4">
          Está tendo problemas?
        </Text>
      </View>
    </ImageBackground>
  );
};
export default Login;
