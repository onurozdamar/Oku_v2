import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import BookCard from '../components/Card/BookCard';
import {BaseManager} from '../database';

const ReadingBooks = ({navigation}) => {
  const manager = new BaseManager();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    manager
      .getReadingBooks()
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => {}}
        refreshing={loading}
        renderItem={data => (
          <BookCard
            data={data.item}
            onPress={() => {
              navigation.navigate('Kitap Oku', {
                data: data.item.bookId,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default ReadingBooks;

const styles = StyleSheet.create({
  container: {},
});
