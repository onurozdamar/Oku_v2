import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MyPicker from '../components/Input/MyPicker';
import MyTextInput from '../components/Input/MyTextInput';
import {BaseManager} from '../database';
import * as Yup from 'yup';

const AddBook = ({navigation, route}) => {
  const book = route?.params?.data;

  const manager = new BaseManager();

  const validationSchema = Yup.object().shape({
    bookName: Yup.string().required('Bu alan zorunludur.'),
    page: Yup.number('Bu alan sayı olmalıdır.')
      .required('Bu alan zorunludur.')
      .positive('Bu alan 0 dan büyük olmalıdır')
      .integer('Bu alan tam sayı olmalıdır.'),
    currentPage: Yup.number('Bu alan sayı olmalıdır.').integer(
      'Bu alan tam sayı olmalıdır.',
    ),
    authorName: Yup.string().required('Bu alan zorunludur.'),
  });

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          bookName: book?.bookName || '',
          page: (book?.page || '') + '',
          authorName: book?.authorName || '',
          currentPage: (book?.currentPage || '0') + '',
          type: book?.type || 'kitap',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          if (book) {
            values.authorId = book.authorId;
            values.bookId = book.bookId;
            manager.updateBook(values);
            // manager.updateAuthor(values);
          } else {
            manager.getAuthorByName(values.authorName).then(author => {
              if (author) {
                values.authorId = author.authorId;
                manager.addBook(values);
              } else {
                manager.addAuthor(values).then(authorId => {
                  values.authorId = authorId;
                  manager.addBook(values);
                });
              }
            });
          }

          navigation.goBack();
        }}
        enableReinitialize={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          isValid,
        }) => (
          <View>
            <View style={styles.img}></View>
            <MyTextInput
              label={'Kitap Adı'}
              value={values.bookName}
              onBlur={handleBlur('bookName')}
              onChangeText={handleChange('bookName')}
              error={errors.bookName}
            />
            <MyTextInput
              label={'Sayfa Sayısı'}
              value={values.page}
              onBlur={handleBlur('page')}
              onChangeText={handleChange('page')}
              error={errors.page}
            />
            <MyTextInput
              label={'Yazar Adı'}
              value={values.authorName}
              onBlur={handleBlur('authorName')}
              onChangeText={handleChange('authorName')}
              error={errors.authorName}
            />

            {book && (
              <MyTextInput
                label={'Sayfa'}
                value={values.currentPage}
                onBlur={handleBlur('currentPage')}
                onChangeText={handleChange('currentPage')}
                error={errors.currentPage}
              />
            )}

            <MyPicker
              label={'Tür'}
              value={values.type}
              items={[
                {label: 'Kitap', value: 'kitap'},
                {label: 'Etkinlik', value: 'etkinlik'},
              ]}
              onValueChange={(itemValue, itemIndex) => {
                setFieldValue('type', itemValue);
              }}
            />
            <MyButton
              text={book ? 'Güncelle' : 'Kaydet'}
              slim
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddBook;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    height: '100%',
  },
  img: {
    width: 100,
    height: 100,
    backgroundColor: '#ff8000',
    alignSelf: 'center',
  },
});
