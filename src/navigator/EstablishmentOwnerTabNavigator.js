import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'native-base';
import { useSelector } from 'react-redux';
import loginStyle from '../components/login/loginStyle';
import { neutral, primary, secondary } from '../assets/getColors';
import EstablishmentOwnerHomeScreen from '../components/establishmentOwner/EstablishmentOwnerHomeScreen';
import RezervacijeScreen from '../components/establishmentOwner/rezervacijeScreen/RezervacijeScreen';
import ObjektiScreen from '../components/establishmentOwner/objekti/ObjektiScreen';
import UserProfileScreen from '../components/user/userProfileScreen/UserProfileScreen';
import { selectUser } from '../redux/features/userSlice';
import EstablishmentHomeScreenStack from './EstablishmentHomeScreenStack';

const Tab = createBottomTabNavigator();

function EstablishmentOwnerTabNavigator() {
  const user = useSelector(selectUser);

  const renderIcon = (focused, color, route, size) => {
    let iconName;
    if (route.name === 'Početna') {
      iconName = focused ? 'ios-home' : 'ios-home-outline';
    } else if (route.name === 'Rezervacije') {
      iconName = focused ? 'bookmark' : 'bookmark-outline';
    } else if (route.name === 'Objekti') {
      iconName = focused ? 'restaurant' : 'restaurant-outline';
    } else if (route.name === 'Račun') {
      return (
        <Image
          w={7}
          h={7}
          alt="UserProfileImage"
          borderRadius={30}
          borderWidth={2}
          borderColor={focused ? primary : neutral}
          source={{ uri: user.photoURL }}
        />
      );
      // iconName = focused ? 'person' : 'person-outline';
    }

    return <Icons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { elevation: 6 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size, number }) => renderIcon(focused, color, route, size),
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name="Početna" component={EstablishmentHomeScreenStack} />
      <Tab.Screen
        // options={{ tabBarBadge: null }}
        name="Rezervacije"
        component={RezervacijeScreen}
      />
      <Tab.Screen name="Objekti" component={ObjektiScreen} />
      <Tab.Screen name="Račun" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

export default EstablishmentOwnerTabNavigator;
