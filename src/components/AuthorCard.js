import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function AuthorCard(props) {
  const {data, onPress} = props;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{data?.authorName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
  },
});
