import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import BookCard from '../components/Card/BookCard';
import {BaseManager} from '../database';

const AuthorsBooks = ({navigation, route}) => {
  const author = route?.params?.data;
  const manager = new BaseManager();

  const [data, setData] = useState([]);

  useEffect(() => {
    author && navigation.setOptions({title: author.authorName + ' Kitapları'});
    navigation.setParams({author});
    manager
      .getBooksWithLastReadByAuthorId(author.authorId)
      .then(res => setData(res));
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
