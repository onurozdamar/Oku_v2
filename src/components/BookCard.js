import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function BookCard(props) {
  const {data, onPress} = props;

  return (
    <TouchableOpacity style={{...styles.card}} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.info}>Kitap Adı:</Text>
          <Text style={styles.name}>{data?.name}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{...styles.info, flex: 5}}>Toplam Sayfa:</Text>
          <Text style={{...styles.name, flex: 3}}>{data?.page}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.info}>Son Okuma:</Text>
          <Text style={styles.name}>{data?.lastRead}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{...styles.info, flex: 5}}>Sayfa:</Text>
          <Text style={{...styles.name, flex: 3}}>{data?.currentPage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgb(151,251,155)',
    padding: 5,
    margin: 5,
    marginTop: 0,
    borderRadius: 5,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    flex: 3,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    flex: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    color: 'black',
    marginRight: 5,
    flex: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
  info: {
    color: 'rgb(11,11,10)',
    fontWeight: '300',
    marginLeft: 5,
    flex: 1,
    alignSelf: 'center',
  },
});
