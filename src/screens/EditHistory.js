import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyButton from '../components/MyButton';
import MyDatePicker from '../components/MyDatePicker';
import MyTextInput from '../components/MyTextInput';
import * as Yup from 'yup';
import {BaseManager} from '../database';

const EditHistory = ({navigation, route}) => {
  const data = route?.params?.data;
  const manager = new BaseManager();

  const validationSchema = Yup.object().shape({
    readTime: Yup.number('Bu alan sayı olmalıdır.')
      .required('Bu alan zorunludur.')
      .positive('Bu alan 0 dan büyük olmalıdır')
      .integer('Bu alan tam sayı olmalıdır.'),
    readPage: Yup.number('Bu alan sayı olmalıdır.')
      .required('Bu alan zorunludur.')
      .positive('Bu alan 0 dan büyük olmalıdır')
      .integer('Bu alan tam sayı olmalıdır.'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          readDate: data?.readDate ? new Date(data.readDate) : new Date(),
          readTime: data?.readTime + '' ?? '',
          readPage: data?.readPage + '' ?? '',
          desc: data?.desc ?? '',
        }}
        onSubmit={values => {
          manager.updateHistory({
            ...values,
            bookId: data.bookId,
            historyId: data.historyId,
          });
          manager.decreaseBookPage(
            data.bookId,
            data.readPage - values.readPage * 1,
          );
          navigation.goBack();
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}>
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
            <MyDatePicker
              label={'Okuma Tarihi'}
              date={values.readDate}
              onChange={setFieldValue}
              fieldName="readDate"
            />
            <MyTextInput
              label={'Okunan Süre'}
              value={values.readTime}
              onBlur={handleBlur('readTime')}
              onChangeText={handleChange('readTime')}
              error={errors.readTime}
            />
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
            />
            <MyButton
              text={'Kaydet'}
              slim
              onPress={handleSubmit}
              disabled={!isValid}
            />
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
