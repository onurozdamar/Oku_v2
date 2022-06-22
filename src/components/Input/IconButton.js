import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = ({icon, color, size, onPress, style}) => {
  return (
    <TouchableOpacity
      style={{...(style ? style : styles.button), margin: 15}}
      hitSlop={{top: 15, bottom: 15, left: 20, right: 20}}
      onPress={() => {
        onPress && onPress();
      }}>
      <Icon name={icon} size={size ?? 30} color={color ?? 'black'} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ecc02d',
    padding: 10,
  },
});
