import React from 'react';
import ReadBook from './ReadBook';
import MainPage from './MainPage';
import Books from './Books';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();

const Menu = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{margin: 15}}
      hitSlop={{top: 15, bottom: 15, left: 20, right: 20}}
      onPress={() => {
        onPress && onPress();
      }}>
      <Icon name={'history'} size={30} color={'black'} />
    </TouchableOpacity>
  );
};

const Home = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Kitap Oku"
      screenOptions={({route}) => ({
        tabBarItemStyle: {},
        tabBarStyle: {height: 50},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Ana Sayfa') {
            iconName = 'assistant';
          } else if (route.name === 'Kitap Oku') {
            iconName = 'book-open-page-variant';
          } else if (route.name === 'Kitaplar') {
            iconName = 'book-variant-multiple';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Ana Sayfa" component={MainPage} />
      <Tab.Screen
        name="Kitap Oku"
        component={ReadBook}
        options={({navigation, route}) => ({
          headerRight: () => (
            <Menu
              onPress={() => {
                navigation.navigate('Okuma Geçmişi', {
                  data: route.params.book,
                });
              }}
            />
          ),
        })}
      />
      <Tab.Screen name="Kitaplar" component={Books} />
    </Tab.Navigator>
  );
};

export default Home;
