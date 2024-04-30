import { View } from 'react-native';
import { useEffect, useState } from 'react';
import useDataList from '../hooks/useDataList';
import Header from '../components/Header';
// import FocusedStatusBar from '../components/FocusedStatusBar';
import { StatusBar } from 'react-native';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Separator from '../components/Separator';
import axios from 'axios';
import DataList from '../components/DataList';
interface IData {
  id: string;
  name: string;
}

const Courses = () => {
  const baseURL = 'http://192.168.0.195:3000';

  const { data, loading, fetchData } = useDataList<IData>(baseURL);

  return (
    <>
      <StatusBar backgroundColor="#257C2E" />
      <View className="flex-1 bg-white">
        <Header title="Paulo Daúde" subTitle="Aluno" showAvatar={true} />
        <View className="p-6">
          <Title>Bem vindo, Paulo!</Title>
          <Subtitle>Qual curso você estuda?</Subtitle>
        </View>
        <Separator text="Nível Superior" />
        <DataList data={data} loading={loading} loadMore={fetchData} />
      </View>
    </>
  );
};
export default Courses;
