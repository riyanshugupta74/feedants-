import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CompetitionDetailScreen from '../screens/CompetitionDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CreateCompetitionScreen from '../screens/CreateCompetitionScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MySubmissionsScreen from '../screens/MySubmissionsScreen';
import ReferralScreen from '../screens/ReferralScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomNavigation from '../components/BottomNavigation';
import { View } from 'react-native';

export type RootStackParamList = {
  MainTabs: {
    screen?: string;
    params?: any;
  } | undefined;
  Login: undefined;
  Register: undefined;
  EditProfile: undefined;
  MySubmissions: undefined;
  Referral: undefined;
  Settings: undefined;
  Notifications: undefined;
  // Expose these for deep linking if necessary
  Home: undefined;
  CompetitionDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateCompetitionScreen} />
      <Tab.Screen 
        name="Competitions" 
        component={CompetitionDetailScreen} 
        initialParams={{ id: '600000000000000000000000' }} 
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="CompetitionDetail" component={CompetitionDetailScreen} />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
      />
      <Stack.Screen 
        name="MySubmissions" 
        component={MySubmissionsScreen} 
      />
      <Stack.Screen 
        name="Referral" 
        component={ReferralScreen} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
