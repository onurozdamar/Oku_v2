import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import BookDetail from './screens/BookDetail';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const Menu = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{margin: 15}}
      hitSlop={{top: 15, bottom: 15, left: 20, right: 20}}
      onPress={() => {
        // dispatch(setOpenModal(true));
      }}>
      <Icon name={'ellipsis-v'} size={30} color={'black'} />
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{header: () => {}}}
        />
        <Stack.Screen name="Kitap Detayı" component={BookDetail} />
        {/* <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen
          name="Görev Güncelle"
          component={AddGorev}
          options={{
            headerRight: () => <Menu />,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
