import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const MyTextInput = ({label, value, onBlur, onChangeText, error}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={{...styles.input, borderColor: error ? 'red' : 'black'}}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />
      {error && <Text style={styles.error}>*{error}</Text>}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
  },
  input: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    paddingRight: 36,
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 20,
  },
  error: {
    color: 'red',
    marginLeft: 3,
  },
});
