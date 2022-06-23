import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MyBarChart from '../components/Chart/MyBarChart';
import MyLineChart from '../components/Chart/MyLineChart';
import MyPieChart from '../components/Chart/MyPieChart';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const WeekStatistics = () => {
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
    </ScrollView>
  );
};

const MonthStatistics = () => {
  return (
    <ScrollView style={styles.container}>
      <MyBarChart
        headerText={'Aylık Okuma Sayısı'}
        path={'getMonthlyReading'}
      />
      <MyLineChart
        headerText={'Aylık Okuma'}
        path={'getMonthlyReadingPageAndTime'}
      />
      <MyLineChart
        headerText={'Aylık Okuma Hızı'}
        path={'getMonthlyReadingVelocity'}
      />
    </ScrollView>
  );
};

const YearStatistics = () => {
  return (
    <ScrollView style={styles.container}>
      <MyBarChart
        headerText={'Yıllık Okuma Sayısı'}
        path={'getYearlyReading'}
      />
      <MyLineChart
        headerText={'Yıllık Okuma'}
        path={'getYearlyReadingPageAndTime'}
      />
      <MyLineChart
        headerText={'Yıllık Okuma Hızı'}
        path={'getYearlyReadingVelocity'}
      />
    </ScrollView>
  );
};

const AuthorStatistics = () => {
  return (
    <ScrollView style={styles.container}>
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

const Statistics = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Haftalık" component={WeekStatistics} />
      <Tab.Screen name="Aylık" component={MonthStatistics} />
      <Tab.Screen name="Yıllık" component={YearStatistics} />
      <Tab.Screen name="Yazar" component={AuthorStatistics} />
    </Tab.Navigator>
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
