import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AuthorCard from '../components/Card/AuthorCard';
import {BaseManager} from '../database';

const Authors = ({navigation}) => {
  const manager = new BaseManager();

  const [data, setData] = useState([]);

  useEffect(() => {
    manager.getAuthors().then(res => {
      setData(res);
    });
  }, []);

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
