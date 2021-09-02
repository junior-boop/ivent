/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors, { Color } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabFourScreen from '../screens/TabFourScreen';
import TabTreeScreen from '../screens/TabTreeScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Infos from '../screens/infos';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Detail" component={Infos} options={({navigation}) =>({headerShown : false })} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarStyle : {
          backgroundColor : Color.APP_BAR_COLOR,
          height : 56,
          borderTopColor : '#000',
          borderTopWidth : 1,
          elevation : 10
        },
        tabBarItemStyle : {
          paddingBottom : 5
        },
        tabBarLabelStyle : {
          fontSize : 12
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen} 
        options={
          ({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown : false
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({navigation}: RootTabScreenProps<'TabTwo'>) =>({
          title: 'Explorer',
          tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />,
          headerShown : false
        })}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourScreen} 
        options={
          ({ navigation }: RootTabScreenProps<'TabFour'>) => ({
          title: 'Notifications',
          tabBarIcon: ({ color }) => <TabBarIcon name="notification" color={color} />,
          headerShown : false
        })}
      />
      <BottomTab.Screen
        name="Tabtree"
        component={TabTreeScreen}
        options={{
          title: 'Profils',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown : false
        }}
      />
      
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={20} style={{ marginBottom: -3 }} {...props} />;
}
