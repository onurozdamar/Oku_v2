import React, {useState} from 'react';
import {View, Platform, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyButton from './MyButton';

export default MyDatePicker = props => {
  const {
    date,
    onChange,
    fieldName,
    showDate = true,
    showTime = true,
    label,
  } = props;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onChange(fieldName, currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function formatDate(dateStr) {
    if (!dateStr) {
      return '';
    }

    var date = new Date(dateStr);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  function formatTime(dateStr) {
    if (!dateStr) {
      return '';
    }

    var date = new Date(dateStr);
    var h = String(date.getHours()).padStart(2, '0');
    var m = String(date.getMinutes()).padStart(2, '0');

    return h + ':' + m;
  }

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <Text style={styles.inputLabel}>{label}</Text>
      {showDate && (
        <View style={styles.datePickerRow}>
          <Text style={styles.date}>{formatDate(date)}</Text>
          <MyButton
            text={'Tarih Seç'}
            style={styles.button}
            onPress={showDatepicker}
          />
        </View>
      )}

      {showTime && (
        <View style={styles.datePickerRow}>
          <Text style={styles.date}>{formatTime(date)}</Text>
          <MyButton
            text={'Saat Seç'}
            style={styles.button}
            onPress={showTimepicker}
          />
        </View>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  date: {
    fontSize: 17,
    margin: 5,
    flex: 1,
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    fontSize: 25,
    flex: 1,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 20,
  },
});
