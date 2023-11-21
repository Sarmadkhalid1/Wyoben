import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens'
import { colors, icons, screenHeight } from '../assets'
import { Image } from 'react-native'
import MainStackNavigator from './HomeStackNavigator'
import { Guides } from '../screens/Guides/Guides'
import { More } from '../screens/More/More'

const Tab = createBottomTabNavigator()

export default function BottomTabs(props) {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.primary,
            height: (screenHeight * 83) / 1000,
          },
          tabBarLabelStyle: {
            fontSize: screenHeight * 0.015,
            color: '#ffffff',
            fontWeight: '400',
            marginBottom: screenHeight * 0.015,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Home') {
              iconName = 'calculator'
            } else if (route.name === 'More') {
              iconName = 'more'
            } else if (route.name === 'Guides') {
              iconName = 'guides'
            }
            return (
              <Image
                source={focused ? icons[iconName + 'Focused'] : icons[iconName]}
                style={{
                  height: focused
                    ? (screenHeight * 57) / 1000
                    : (screenHeight * 50) / 1000,
                  width: focused
                    ? (screenHeight * 57) / 1000
                    : (screenHeight * 50) / 1000,
                  tintColor: '#ffffff',
                }}
              />
            )
          },
        })}>
        <Tab.Screen
          name={'Home'}
          component={MainStackNavigator}
          options={{ title: 'Home', tabBarShowLabel: false }}
        />
        <Tab.Screen
          name={'Guides'}
          component={Guides}
          options={{ title: 'Guides', tabBarShowLabel: false }}
        />
        <Tab.Screen
          name={'More'}
          component={More}
          options={{ title: 'More', tabBarShowLabel: false }}
        />
      </Tab.Navigator>
    </>
  )
}
