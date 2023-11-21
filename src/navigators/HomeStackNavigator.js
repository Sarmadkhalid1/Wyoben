import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslations } from "../core/dopebase";
import { HomeScreen } from "../screens";
import HVC from "../screens/HVC/HVC";
import { Guides } from "../screens/Guides/Guides";
import { More } from "../screens/More/More";
import { Results } from "../screens/Results/Results";
import DrillingFluidCalculator from "../screens/DrillingFluidCalculator/DrillingFluidCalculator";
import AnnularVelocityCalculator from "../screens/AnnularVelocityCalculator/AnnularVelocityCalculator";
import FluidWeightUpCalculator from "../screens/FluidWeightUpCalculator/FluidWeightUpCalculator";
import BottomsUpCalculator from "../screens/BottomsUpCalculator/BottomsUpCalculator";
import AnnularVelocityCalculatorAir from "../screens/AnnularVelocityCalculatorAir/AnnularVelocityCalculatorAir";
import AnnularVelocityCalculatorFluid from "../screens/AnnularVelocityCalculatorFluid/AnnularVelocityCalculatorFluid";
import PluggingHolesCalculator from "../screens/PluggingHolesCalculator/PluggingHolesCalculator";
import AnnularSpaceCalculator from "../screens/AnnularSpaceCalculator/AnnularSpaceCalculator";
import DrillingCalculator from "../screens/DrillingCalculator/DrillingCalculator";
import AboutUs from "../screens/AboutUs/AboutUs";
import ContactUs from "../screens/ContactUs/ContactUs";
import TermsOfUse from "../screens/TermsOfUse/TermsOfUse";
import ProductApplication from "../screens/ProductApplication/ProductApplication";

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  const { localized } = useTranslations();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        // headerBackTitle: localized('Back'),
      }}
      initialRouteName="Calculators"
    >
      <MainStack.Screen
        name="Calculators"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="HVC"
        component={HVC}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="PluggingHolesCalculator"
        component={PluggingHolesCalculator}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="AnnularSpaceCalculator"
        component={AnnularSpaceCalculator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="DrillingFluidCalculator"
        component={DrillingFluidCalculator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AnnularVelocityCalculator"
        component={AnnularVelocityCalculator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AnnularVelocityCalculatorAir"
        component={AnnularVelocityCalculatorAir}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="AnnularVelocityCalculatorFluid"
        component={AnnularVelocityCalculatorFluid}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="DrillingCalculator"
        component={DrillingCalculator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="FluidWeightUpCalculator"
        component={FluidWeightUpCalculator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="BottomsUpCalculator"
        component={BottomsUpCalculator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ProductApplication"
        component={ProductApplication}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Guides"
        component={Guides}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="More"
        component={More}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Results"
        component={Results}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
