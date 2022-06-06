import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import BookCard from '../components/BookCard';

const Books = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'book name',
      lastRead: '11.11.2022',
      page: 2020,
      currentPage: 20,
    },
    {
      id: 2,
      name: 'book name',
      lastRead: '11.11.2022',
      page: 200,
      currentPage: 20,
    },
    {
      id: 3,
      name: 'book name',
      lastRead: '11.11.2022',
      page: 200,
      currentPage: 20,
    },
    {
      id: 4,
      name: 'book name',
      lastRead: '11.11.2022',
      page: 200,
      currentPage: 20,
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
              console.log('go');
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
