import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyButton from '../components/MyButton';

const MainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MyButton text={'Kitap Oku'} />
        <MyButton text={'Kitaplarım'} />
      </View>
      <View style={styles.row}>
        <MyButton text={'Kitap Ekle'} />
        <MyButton text={'Okunan Kitaplar'} />
      </View>
      <View style={styles.row}>
        <MyButton text={'Yazarlar'} />
        <MyButton text={'İstatistikler'} />
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
