import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Clock from '../components/Clock';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';

const ReadBook = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.book}>
        <Text style={styles.bookName}>Kitap adı</Text>
        <Text style={styles.page}>10/300</Text>
      </View>
      <Clock />
      <View style={styles.form}>
        <MyTextInput label={'Okunan Sayfa'} />
        <MyButton text={'Kaydet'} style={styles.button} />
      </View>
    </View>
  );
};

export default ReadBook;

const styles = StyleSheet.create({
  container: {},
  button: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 10,
  },
  form: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  book: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  bookName: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    // backgroundColor: 'red',
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 60,
  },
  page: {
    fontSize: 16,
    position: 'absolute',
    right: 10,
  },
});
