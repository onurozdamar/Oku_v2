import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../components/MyButton';
import MyDatePicker from '../components/MyDatePicker';
import MyTextInput from '../components/MyTextInput';

const EditHistory = ({navigation, route}) => {
  const data = route?.params?.data;
  console.log(data, new Date(data.date));

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          date: new Date(data?.date) ?? new Date(),
          readTime: data?.readTime + '' ?? '',
          readPage: data?.readPage + '' ?? '',
          desc: data?.desc ?? '',
        }}
        onSubmit={values => {}}
        enableReinitialize={true}>
        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
          <View>
            <MyDatePicker
              label={'Okuma Tarihi'}
              date={values.date}
              onChange={setFieldValue}
              fieldName="date"
            />
            <MyTextInput
              label={'Okunan Süre'}
              value={values.readTime}
              onBlur={handleBlur('readTime')}
              onChangeText={handleChange('readTime')}
            />
            <MyTextInput
              label={'Okunan Sayfa'}
              value={values.readPage}
              onBlur={handleBlur('readPage')}
              onChangeText={handleChange('readPage')}
            />
            <MyTextInput
              label={'Açıklama'}
              value={values.desc}
              onBlur={handleBlur('desc')}
              onChangeText={handleChange('desc')}
            />
            <MyButton text={'Kaydet'} slim />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditHistory;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    height: '100%',
  },
});
