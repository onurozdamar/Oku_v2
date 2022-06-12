import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const MyButton = ({onPress, text, style, slim}) => {
  return (
    <TouchableOpacity
      style={style ? style : slim ? styles.slim : styles.square}
      onPress={() => {
        console.log('c');
        onPress && onPress();
      }}>
      <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '700'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  square: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 120,
    height: 120,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#ecc02d',
  },
  slim: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 10,
  },
});
