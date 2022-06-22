import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import IconButton from '../components/Input/IconButton';
import {BaseManager} from '../database';
import {formatDate} from '../helper';

const Row = ({navigation, data, onDelete}) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      style={{borderBottomWidth: 0.5, borderBottomColor: 'grey'}}
      onPress={() => {
        setOpen(!open);
      }}>
      <View style={styles.row}>
        <Text style={{fontSize: 18, flex: 1}}>{formatDate(data.readDate)}</Text>
        <Text style={styles.info}>{data.readTime}</Text>
        <Text style={styles.info}>{data.readPage}</Text>
      </View>
      <View style={{...styles.extend, display: open ? 'flex' : 'none'}}>
        <Text style={styles.desc}>{data.desc}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <IconButton
            size={30}
            icon={'pencil'}
            color={'green'}
            style={{}}
            onPress={() => {
              navigation.navigate('Geçmişi Düzenle', {data});
            }}
          />
          <IconButton
            size={30}
            icon={'delete'}
            color={'red'}
            style={{}}
            onPress={() => {
              onDelete();
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BookHistory = ({navigation, route}) => {
  const data = route?.params?.data;
  const manager = new BaseManager();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHistories();
  }, []);

  function getHistories() {
    setLoading(true);
    manager
      .getHistories(data.bookId)
      .then(res => {
        setHistory(res);
      })
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bookName}>{data.bookName}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <Text style={styles.text}>Tarih</Text>
        <Text style={styles.text}>Okunan Süre</Text>
        <Text style={styles.text}>Okunan Sayfa</Text>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={() => {}}
        renderItem={data => (
          <Row
            data={data.item}
            navigation={navigation}
            onDelete={() => {
              setLoading(true);
              manager.deleteHistory(data.item).then(() => getHistories());
            }}
          />
        )}
      />
    </View>
  );
};

export default BookHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  bookName: {
    fontSize: 24,
    color: 'black',
    margin: 12,
    alignSelf: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  info: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'left',
    fontSize: 18,
    flex: 1,
  },
  desc: {
    marginLeft: 15,
  },
  button: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 10,
  },
});
