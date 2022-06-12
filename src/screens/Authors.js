import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AuthorCard from '../components/AuthorCard';

const Authors = ({navigation}) => {
  const data = [
    {
      id: 1,
      author: 'yazar1',
    },
    {
      id: 2,
      author: 'yazar2',
    },
    {
      id: 3,
      name: 'book name3',
      author: 'yazar3',
    },
    {
      id: 4,
      author: 'yazar4',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={data => (
          <AuthorCard
            data={data.item}
            onPress={() => {
              navigation.navigate('Yazarın Kitapları', {
                data: data.item,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default Authors;

const styles = StyleSheet.create({
  container: {},
});
