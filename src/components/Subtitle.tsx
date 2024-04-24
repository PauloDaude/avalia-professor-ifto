import { Text, TextProps } from 'react-native';
const Subtitle = (props: TextProps) => {
  return (
    <Text
      className="font-OpenSansLight text-base text-primary-black leading-4"
      {...props}
    />
  );
};
export default Subtitle;
