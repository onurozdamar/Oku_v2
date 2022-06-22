import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../components/Input/MyButton';

const MainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MyButton
          text={'Kitap Ekle'}
          onPress={() => {
            navigation.navigate('Kitap Ekle');
          }}
        />
        <MyButton
          text={'Okunan Kitaplar'}
          onPress={() => {
            navigation.navigate('Okunan Kitaplar');
          }}
        />
      </View>
      <View style={styles.row}>
        <MyButton
          text={'Yazarlar'}
          onPress={() => {
            navigation.navigate('Yazarlar');
          }}
        />
        <MyButton
          text={'İstatistikler'}
          onPress={() => {
            navigation.navigate('İstatistikler');
          }}
        />
      </View>
    </View>
  );
};

export default MainPage;

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
