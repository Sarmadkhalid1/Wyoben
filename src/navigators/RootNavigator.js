import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoadScreen, WalkthroughScreen } from "../core/onboarding";
import HomeStackNavigator from "./HomeStackNavigator";
import LoginStack from "./AuthStackNavigator";
import BottomTabs from "./BottomTabs";
import Splash from "../screens/Splash/Splash";
import { HomeScreen } from "../screens";
import AboutUs from "../screens/AboutUs/AboutUs";
import MoreStackNavigator from "./MoreStack";

const Root = createStackNavigator();

const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="BottomStack"
    >
      <Root.Screen name={"BottomStack"} component={BottomTabs} />
    </Root.Navigator>
  );
};

export default RootNavigator;
