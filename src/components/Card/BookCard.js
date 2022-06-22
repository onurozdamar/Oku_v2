import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatDate} from '../../helper';

const colors = [
  '#E3FCBF9d',
  '#E3FCBF',
  '#B8F1B063',
  '#B8F1B09d',
  '#B8F1B0',
  '#00ffaa63',
  '#00ffaa9d',
  '#00ffaa',
];

export default function BookCard(props) {
  const {data, onPress} = props;

  const Color = () => {
    const index = Math.min(
      Math.floor((data?.currentPage / data?.page || 0) * 8),
      7,
    );
    return colors[index];
  };

  return (
    <TouchableOpacity
      style={{...styles.card, backgroundColor: Color()}}
      onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.info}>Kitap Adı:</Text>
          <Text style={styles.name}>{data?.bookName}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{...styles.info, flex: 5}}>Toplam Sayfa:</Text>
          <Text style={{...styles.date, flex: 3}}>{data?.page}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.info}>Son Okuma:</Text>
          <Text style={styles.date}>{formatDate(data?.readDate)}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{...styles.info, flex: 5}}>Sayfa:</Text>
          <Text style={{...styles.date, flex: 3}}>{data?.currentPage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: 'rgb(151,251,155)',
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
  date: {
    color: 'rgba(11,11,10,0.7)',
    fontSize: 14,
    marginRight: 5,
    flex: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
  page: {
    color: 'rgba(11,11,10,0.7)',
    fontSize: 16,
    marginRight: 5,
    flex: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
