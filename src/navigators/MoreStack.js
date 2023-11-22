import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AboutUs from "../screens/AboutUs/AboutUs";
import ContactUs from "../screens/ContactUs/ContactUs";
import { More } from "../screens/More/More";
import TermsOfUse from "../screens/TermsOfUse/TermsOfUse";

const MoreStack = createStackNavigator();

const MoreStackNavigator = () => {
  return (
    <MoreStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="More"
    >
      <MoreStack.Screen name="More" component={More} />
      <MoreStack.Screen name="AboutUs" component={AboutUs} />
      <MoreStack.Screen name="ContactUs" component={ContactUs} />
      <MoreStack.Screen name="TermsOfUse" component={TermsOfUse} />
    </MoreStack.Navigator>
  );
};

export default MoreStackNavigator;
