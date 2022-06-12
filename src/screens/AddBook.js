import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../components/MyButton';
import MyPicker from '../components/MyPicker';
import MyTextInput from '../components/MyTextInput';

const AddBook = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          bookName: '',
          page: '',
          authorName: '',
          type: '',
        }}
        onSubmit={values => {}}
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
                {label: 'Kitap', value: 0},
                {label: 'Etkinlik', value: 1},
              ]}
              onValueChange={(itemValue, itemIndex) => {
                setFieldValue('type', itemValue);
              }}
            />
            <MyButton text={'Kaydet'} slim />
          </View>
        )}
      </Formik>
    </View>
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
