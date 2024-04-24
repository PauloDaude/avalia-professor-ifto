import { Text, TextProps } from 'react-native';
const Title = (props: TextProps) => {
  return (
    <Text
      className="font-OpenSansSemiBold text-xl text-primary-black"
      {...props}
    />
  );
};
export default Title;
