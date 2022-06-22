import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {BaseManager} from '../../database';

export default function MyLineChart({headerText, path}) {
  const manager = new BaseManager();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (path && manager[path]) {
      setLoading(true);
      manager[path]()
        .then(res => setData(res))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{headerText}</Text>
      {loading ? (
        <Text style={styles.name}>Yükleniyor...</Text>
      ) : (
        <LineChart
          data={data}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
