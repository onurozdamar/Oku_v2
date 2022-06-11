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
      history: [
        {date: '23 Mar 2022 5:32:5', readPage: 22, readTime: '1:52'},
        {date: '4 Jul 2022 12:28:24', readPage: 35, readTime: '33:1'},
        {date: '10 May 2022 12:17:31', readPage: 43, readTime: '1:51'},
      ],
    },
    {
      id: 2,
      name: 'book name2',
      author: 'yazar2',
      addDate: '12.2.2022',
      lastRead: '1.11.2022',
      page: 400,
      currentPage: 69,
      history: [
        {date: '11 Mar 2022 16:22:13', readPage: 4, readTime: '34:26'},
        {date: '16 Aug 2022 12:46:98', readPage: 6, readTime: '49:24'},
      ],
    },
    {
      id: 3,
      name: 'book name3',
      author: 'yazar3',
      addDate: '1.12.2022',
      lastRead: '11.1.2022',
      page: 110,
      currentPage: 109,
      history: [
        {
          date: '9 Apr 2022 5:17:45',
          readPage: 39,
          readTime: '37:47',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        },
        {
          date: '19 Aug 2022 0:51:23',
          readPage: 49,
          readTime: '18:12',
          desc: 'Tincidunt lobortis feugiat vivamus at augue',
        },
        {
          date: '2 Nov 2022 8:51:0',
          readPage: 23,
          readTime: '54:40',
          desc: 'Massa tempor nec feugiat nisl pretium fusce. Vehicula ipsum a arcu cursus vitae congue',
        },
        {
          date: '10 May 2022 23:15:7',
          readPage: 41,
          readTime: '31:3',
          desc: 'Maecenas pharetra convallis posuere morbi leo',
        },
        {
          date: '23 Dec 2022 10:29:66',
          readPage: 56,
          readTime: '10:38',
          desc: 'Praesent elementum facilisis leo vel fringilla est ullamcorper eget',
        },
        {
          date: '5 Dec 2022 7:30:23',
          readPage: 17,
          readTime: '17:59',
          desc: 'Purus viverra accumsan in nisl nisi. Libero volutpat sed cras ornare arcu',
        },
        {
          date: '29 Nov 2022 22:36:96',
          readPage: 19,
          readTime: '44:56',
          desc: 'Venenatis lectus magna fringilla urna porttitor rhoncus dolor',
        },
      ],
    },
    {
      id: 4,
      name: 'book name4',
      author: 'yazar4',
      addDate: '12.6.2022',
      lastRead: '11.6.2022',
      page: 90,
      currentPage: 0,
      history: [
        {date: '1 May 2022 18:48:19', readPage: 27, readTime: '8:49'},
        {date: '23 Apr 2022 1:15:34', readPage: 9, readTime: '58:6'},
        {date: '4 Dec 2022 15:48:17', readPage: 7, readTime: '34:4'},
        {date: '5 Dec 2022 13:18:98', readPage: 22, readTime: '2:53'},
        {date: '25 Jan 2022 17:51:89', readPage: 14, readTime: '56:6'},
      ],
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
