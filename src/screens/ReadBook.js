import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Clock from '../components/Clock';
import MyButton from '../components/Input/MyButton';
import MyTextInput from '../components/Input/MyTextInput';
import {Formik} from 'formik';
import {BaseManager} from '../database';
import * as Yup from 'yup';

const ReadBook = ({navigation, route}) => {
  const bookId = route?.params?.data;

  const manager = new BaseManager();

  const [book, setBook] = useState(null);

  useEffect(() => {
    manager.createBookTable();
    manager.createAuthorTable();
    manager.createHistoryTable();
  }, []);

  useEffect(() => {
    if (bookId) {
      manager.getBookById(bookId).then(res => {
        updateBook(res);
      });
    } else {
      manager.getLastReadedBook().then(res => {
        updateBook(res);
      });
    }
  }, [bookId]);

  const updateBook = book => {
    setBook(book);
    navigation.setParams({book});
  };

  const validationSchema = Yup.object().shape({
    desc: Yup.string(),
    readPage: Yup.number('Bu alan sayı olmalıdır.')
      .required('Bu alan zorunludur.')
      .positive('Bu alan 0 dan büyük olmalıdır')
      .integer('Bu alan tam sayı olmalıdır.'),
  });

  function r(s, e) {
    return s + Math.floor(Math.random() * (e - s));
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.book}>
        <Text style={styles.bookName}>{book?.bookName || 'Kitap adı'}</Text>
        <Text style={styles.page}>
          {book ? book.currentPage + '/' + book.page : '10/300'}
        </Text>
      </View>
      <Clock />
      <View style={styles.form}>
        <Formik
          initialValues={{
            readPage: '',
            desc: '',
          }}
          onSubmit={(values, {resetForm}) => {
            for (let index = 0; index < 10; index++) {
              console.log('s');
              const rp = r(5, 50);
              const rd = new Date(r(2015, 2022), r(0, 11), r(1, 31));
              rd.setHours(r(0, 24));
              rd.setMinutes(r(0, 60));
              manager.addHistory({
                ...values,
                readPage: rp,
                readDate: rd,
                readTime: r(10, 60),
                bookId: book.bookId,
              });
              manager.updateBookPage(book.bookId, book.currentPage + rp);
              manager.getBookById(book.bookId).then(res => {
                updateBook(res);
              });
            }

            resetForm();
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <View>
              <MyTextInput
                label={'Okunan Sayfa'}
                value={values.readPage}
                onBlur={handleBlur('readPage')}
                onChangeText={handleChange('readPage')}
                error={errors.readPage}
              />
              <MyTextInput
                label={'Açıklama'}
                value={values.desc}
                onBlur={handleBlur('desc')}
                onChangeText={handleChange('desc')}
                error={errors.desc}
              />

              <MyButton
                text={'Kaydet'}
                slim
                onPress={handleSubmit}
                disabled={!book || !isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ReadBook;

const styles = StyleSheet.create({
  container: {},
  button: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 10,
  },
  form: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  book: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  bookName: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    // backgroundColor: 'red',
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 60,
  },
  page: {
    fontSize: 16,
    position: 'absolute',
    right: 10,
  },
});
