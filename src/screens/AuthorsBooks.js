import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import BookCard from '../components/BookCard';

const AuthorsBooks = ({navigation, route}) => {
  const author = route?.params?.data;

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

  useEffect(() => {
    author && navigation.setOptions({title: author.author + ' Kitapları'});
  }, []);

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

export default AuthorsBooks;

const styles = StyleSheet.create({
  container: {},
});
