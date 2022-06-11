import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import BookCard from '../components/BookCard';

const Books = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'book name1',
      author: 'yazar1',
      addDate: '12.11.2022',
      lastRead: '11.12.2022',
      page: 2020,
      currentPage: 555,
    },
    {
      id: 2,
      name: 'book name2',
      author: 'yazar2',
      addDate: '12.2.2022',
      lastRead: '1.11.2022',
      page: 400,
      currentPage: 69,
    },
    {
      id: 3,
      name: 'book name3',
      author: 'yazar3',
      addDate: '1.12.2022',
      lastRead: '11.1.2022',
      page: 110,
      currentPage: 109,
    },
    {
      id: 4,
      name: 'book name4',
      author: 'yazar4',
      addDate: '12.6.2022',
      lastRead: '11.6.2022',
      page: 90,
      currentPage: 0,
    },
  ];

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
