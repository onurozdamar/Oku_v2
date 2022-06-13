import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import BookCard from '../components/BookCard';
import {BaseManager} from '../database';

const Books = ({navigation}) => {
  const manager = new BaseManager();
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      manager.getBooks().then(res => {
        setData(res);
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={data => (
          <BookCard
            data={data.item}
            onPress={() => {
              navigation.navigate('Kitap Detayı', {
                data: data.item,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {},
});
