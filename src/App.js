import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import BookDetail from './screens/BookDetail';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BookHistory from './screens/BookHistory';
import EditHistory from './screens/EditHistory';
import ReadingBooks from './screens/ReadingBooks';
import AddBook from './screens/AddBook';
import Authors from './screens/Authors';
import AuthorsBooks from './screens/AuthorsBooks';
import Statistics from './screens/Statistics';
import {BaseManager} from './database';

const Stack = createStackNavigator();

const Menu = ({onEditPress, onDeletePress, dontEdit}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {!dontEdit && (
        <TouchableOpacity
          style={{margin: 15}}
          hitSlop={{top: 15, bottom: 15, left: 20, right: 20}}
          onPress={() => {
            onEditPress && onEditPress();
          }}>
          <Icon name={'pencil'} size={30} color={'green'} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{margin: 15}}
        hitSlop={{top: 15, bottom: 15, left: 20, right: 20}}
        onPress={() => {
          onDeletePress && onDeletePress();
        }}>
        <Icon name={'delete'} size={30} color={'red'} />
      </TouchableOpacity>
    </View>
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
        <Stack.Screen
          name="Kitap Detayı"
          component={BookDetail}
          options={({navigation, route}) => ({
            headerRight: () => (
              <Menu
                onDeletePress={() => {
                  const manager = new BaseManager();
                  manager.deleteBook(route.params.book.bookId).then(() => {
                    manager.deleteHistoryByBookId(route.params.book.bookId);
                    navigation.goBack();
                  });
                }}
                onEditPress={() => {
                  navigation.navigate('Kitap Ekle', {
                    data: route.params.book,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="Okuma Geçmişi" component={BookHistory} />
        <Stack.Screen name="Geçmişi Düzenle" component={EditHistory} />
        <Stack.Screen name="Okunan Kitaplar" component={ReadingBooks} />
        <Stack.Screen name="Kitap Ekle" component={AddBook} />
        <Stack.Screen name="Yazarlar" component={Authors} />
        <Stack.Screen
          name="Yazarın Kitapları"
          component={AuthorsBooks}
          options={({navigation, route}) => ({
            headerRight: () => (
              <Menu
                onDeletePress={() => {
                  const manager = new BaseManager();
                  manager.deleteAuthorWithBooksAndHistory(
                    route.params.author.authorId,
                  );
                  navigation.goBack();
                }}
                dontEdit
              />
            ),
          })}
        />
        <Stack.Screen name="İstatistikler" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
