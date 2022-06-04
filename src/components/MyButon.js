import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MyButton = ({onPress, text, style}) => {
  return (
    <TouchableOpacity
      style={style ?? styles.container}
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 120,
    height: 120,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ecc02d',
  },
});
