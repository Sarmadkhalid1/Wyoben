import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { LoadScreen, WalkthroughScreen } from '../core/onboarding'
import HomeStackNavigator from './HomeStackNavigator'
import LoginStack from './AuthStackNavigator'
import BottomTabs from './BottomTabs'
import Splash from '../screens/Splash/Splash'
import { HomeScreen } from '../screens'

const Root = createStackNavigator()

const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="BottomStack">
      {/* <Root.Screen name="Calculators" component={HomeScreen} /> */}
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      <Root.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="MainStack" component={HomeStackNavigator} />
      <Root.Screen name="Splash" component={Splash} />
      <Root.Screen name={'BottomStack'} component={BottomTabs} />
    </Root.Navigator>
  )
}

export default RootNavigator
