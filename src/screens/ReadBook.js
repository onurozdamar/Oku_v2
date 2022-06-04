import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Clock from '../components/Clock';

const ReadBook = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>read</Text>
      <Clock />
    </View>
  );
};

export default ReadBook;

const styles = StyleSheet.create({
  container: {},
});
