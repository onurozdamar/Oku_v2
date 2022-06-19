import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MyLineChart from '../components/MyLineChart';

const Statistics = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <MyLineChart
        headerText={'Haftalık Okuma'}
        labels={['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts']}
        path={'getWeeklyReading'}
      />
      <MyLineChart
        headerText={'Aylık Okuma'}
        labels={[
          'Oca',
          'Şub',
          'Mar',
          'Nis',
          'May',
          'Haz',
          'Tem',
          'Ağu',
          'Eyl',
          'Eki',
          'Kas',
          'Ara',
        ]}
        path={'getMonthlyReading'}
      />
      <MyLineChart headerText={'Yıllık Okuma'} labels={['Paz']} />
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
