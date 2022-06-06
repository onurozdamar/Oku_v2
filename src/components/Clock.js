import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyButton from './MyButton';

const Clock = ({}) => {
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      return;
    }
    let interval = setInterval(() => {
      setTimer(t => t + 1);
      //   console.log('s');
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [started]);

  function intToTime(int) {
    let hour = Number.parseInt(int / 60);
    let minute = int % 60;

    let hourString = hour < 10 ? '0' + hour : hour;
    let minuteString = minute < 10 ? '0' + minute : minute;
    return hourString + ':' + minuteString;
  }

  function handleStart() {}
  function handleStop() {}
  function handleReset() {
    setTimer(0);
    setStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Text style={styles.timer}>{intToTime(timer)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MyButton style={styles.button} text={'Başlat'} onPress={handleStart} />
        <MyButton style={styles.button} text={'Durdur'} onPress={handleStop} />
        <MyButton
          style={styles.button}
          text={'Sıfırla'}
          onPress={handleReset}
        />
      </View>
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
  },
  clock: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ecc02d',
  },
  timer: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },
  button: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: '#ecc02d',
    padding: 10,
  },
});
