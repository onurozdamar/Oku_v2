import {Formik} from 'formik';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MyButton from '../components/MyButton';
import MyPicker from '../components/MyPicker';
import MyTextInput from '../components/MyTextInput';
import {BaseManager} from '../database';

const AddBook = ({navigation}) => {
  const manager = new BaseManager();

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          bookName: '',
          page: '',
          authorName: '',
          type: 'kitap',
        }}
        onSubmit={values => {
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

          navigation.goBack();
        }}
        enableReinitialize={true}>
        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
          <View>
            <View style={styles.img}></View>
            <MyTextInput
              label={'Kitap Adı'}
              value={values.bookName}
              onBlur={handleBlur('bookName')}
              onChangeText={handleChange('bookName')}
            />
            <MyTextInput
              label={'Sayfa Sayısı'}
              value={values.page}
              onBlur={handleBlur('page')}
              onChangeText={handleChange('page')}
            />
            <MyTextInput
              label={'Yazar Adı'}
              value={values.authorName}
              onBlur={handleBlur('authorName')}
              onChangeText={handleChange('authorName')}
            />

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
            <MyButton text={'Kaydet'} slim onPress={handleSubmit} />
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
