import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import BookDetail from './screens/BookDetail';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import BookHistory from './screens/BookHistory';
import EditHistory from './screens/EditHistory';
import ReadingBooks from './screens/ReadingBooks';
import AddBook from './screens/AddBook';
import Authors from './screens/Authors';
import AuthorsBooks from './screens/AuthorsBooks';
import Statistics from './screens/Statistics';

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
        <Stack.Screen name="Okuma Geçmişi" component={BookHistory} />
        <Stack.Screen name="Geçmişi Düzenle" component={EditHistory} />
        <Stack.Screen name="Okunan Kitaplar" component={ReadingBooks} />
        <Stack.Screen name="Kitap Ekle" component={AddBook} />
        <Stack.Screen name="Yazarlar" component={Authors} />
        <Stack.Screen name="Yazarın Kitapları" component={AuthorsBooks} />
        <Stack.Screen name="İstatistikler" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
