import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MyBarChart from '../components/Chart/MyBarChart';
import MyLineChart from '../components/Chart/MyLineChart';
import MyPieChart from '../components/Chart/MyPieChart';

const Statistics = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <MyBarChart
        headerText={'Haftalık Okuma Sayısı'}
        path={'getWeeklyReading'}
      />
      <MyLineChart
        headerText={'Haftalık Okuma'}
        path={'getWeeklyReadingPageAndTime'}
      />
      <MyLineChart
        headerText={'Haftalık Okuma Hızı'}
        path={'getWeeklyReadingVelocity'}
      />
      <MyLineChart
        headerText={'Aylık Okunan Sayfa'}
        path={'getMonthlyReading'}
      />
      <MyLineChart
        headerText={'Yıllık Okunan Sayfa'}
        path={'getYearlyReading'}
      />
      <MyPieChart
        headerText={'Yazarların Kitap Sayısı'}
        path={'getAuthorsBooksCount'}
        accessor={'count'}
      />
      <MyPieChart
        headerText={'Kitap Okuma Oranı'}
        path={'getBookReadRate'}
        accessor={'sum'}
      />
    </ScrollView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    display: 'flex',
    flex: 1,
    alignContent: 'space-around',
  },
  row: {
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
});
