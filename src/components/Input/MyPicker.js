import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-community/picker';

const MyPicker = ({label, value, onValueChange, items}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Picker
        selectedValue={value}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => {
          onValueChange && onValueChange(itemValue, itemIndex);
        }}>
        {items &&
          items.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value || index}
            />
          ))}
      </Picker>
    </View>
  );
};

export default MyPicker;

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
});
