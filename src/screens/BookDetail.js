import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyButton from '../components/MyButton';
import {BaseManager} from '../database';

const Row = ({info, text}) => (
  <View style={styles.row}>
    <Text style={styles.info}>{info}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const BookDetail = ({navigation, route}) => {
  const data = route?.params?.data;
  const manager = new BaseManager();

  const [authorName, setAuthorName] = useState('');
  const [lastReadDate, setLastReadDate] = useState(null);

  useEffect(() => {
    manager
      .getAuthorById(data.authorId)
      .then(res => setAuthorName(res.authorName));
    manager
      .getLastReadByBook(data.bookId)
      .then(res => setLastReadDate(res.readDate));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.img}></View>
      <Text style={styles.bookName}>{data.bookName}</Text>
      <Text style={styles.bookName}>{authorName}</Text>
      <View style={styles.card}>
        <Row info={'Toplam Sayfa:'} text={data.page} />
        <Row info={'Sayfa:'} text={data.currentPage} />
        <Row info={'Ekleme Tarihi:'} text={data.addDate} />
        <Row info={'Son Okuma'} text={lastReadDate} />
      </View>
      <View style={styles.buttons}>
        <MyButton
          style={styles.button}
          text={'Oku'}
          onPress={() => {
            navigation.navigate('Kitap Oku', {
              data: data.bookId,
            });
          }}
        />
        <MyButton
          style={styles.button}
          text={'Geçmiş'}
          onPress={() => {
            navigation.navigate('Okuma Geçmişi', {
              data,
            });
          }}
        />
      </View>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  img: {
    width: 200,
    height: 200,
    backgroundColor: '#ff8000',
    alignSelf: 'center',
  },
  bookName: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
  card: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  info: {
    flex: 1,
    fontSize: 18,
  },
  text: {
    color: 'black',
    textAlign: 'left',
    fontSize: 18,
    flex: 1,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 10,
  },
});
