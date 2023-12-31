import analytics from "@react-native-firebase/analytics";
import React, { memo, useContext, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { colors, icons, images, screenHeight } from "../../assets";
import {
  DopebaseContext,
  useTheme,
  useTranslations,
} from "../../core/dopebase";
import { useCurrentUser } from "../../core/onboarding";
import { useAuth } from "../../core/onboarding/hooks/useAuth";
import dynamicStyles from "./styles";
// import home_show_case from '../../assets'

export const HomeScreen = memo((props) => {
  const { navigation } = props;
  const currentUser = useCurrentUser();
  const context = useContext(DopebaseContext);
  console.log("====================================");
  console.log("ContextUnit : ", context?.unit);
  console.log("====================================");
  const authManager = useAuth();

  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);
  const [filterType, setFilterType] = useState("Metric");

  const onButtonPress = (button) => {
    console.log("====================================");
    console.log("Button : ", button);
    console.log("====================================");
    // Log a custom event
    analytics().logEvent(button, {
      button_name: button,
    });
  };

  const data = [
    {
      id: "1",
      title: "Hole Volume Calculator",
      event: "Hole_Volume_Calculator",
      navigate_to: "HVC",
    },
    {
      id: "2",
      title: "HDD Drilling Fluid Calculator",
      event: "HDD_Drilling_Fluid_Calculator",
      navigate_to: "DrillingFluidCalculator",
    },
    {
      id: "3",
      title: "Annular Velocity Calculator",
      event: "Annular_Velocity_Calculator",
      navigate_to: "AnnularVelocityCalculator",
    },
    {
      id: "4",
      title: "HDD Back Reaming/Pump Volume Calculator",
      event: "HDD_Back_Reaming_Pump_Volume_Calculator",
      navigate_to: "DrillingCalculator",
    },
    {
      id: "5",
      title: "Fluid Weight Up & Volume Increase Calculator",
      event: "Fluid_Weight_Calculator",
      navigate_to: "FluidWeightUpCalculator",
    },
    {
      id: "6",
      title: "Bottoms up Calculator",
      event: "Bottoms_up_Calculator",
      navigate_to: "BottomsUpCalculator",
    },
  ];

  // useLayoutEffect(() => {
  //   const colorSet = theme.colors[appearance]

  //   navigation.setOptions({
  //     headerTitle: localized('Home'),
  //     headerRight: () => (
  //       <View>
  //         <TouchableIcon
  //           imageStyle={{ tintColor: colorSet.primaryForeground }}
  //           iconSource={theme.icons.logout}
  //           onPress={onLogout}
  //         />
  //       </View>
  //     ),
  //     headerStyle: {
  //       backgroundColor: colorSet.primaryBackground,
  //       borderBottomColor: colorSet.hairline,
  //     },
  //     headerTintColor: colorSet.primaryText,
  //   })
  // }, [])

  // useEffect(() => {
  //   if (!currentUser?.id) {
  //     return
  //   }
  // }, [currentUser?.id])

  // const onLogout = useCallback(() => {
  //   console.log('logout pressed')
  //   authManager?.logout(currentUser)
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: 'LoadScreen',
  //       },
  //     ],
  //   })
  // }, [currentUser])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        item.navigate_to &&
          navigation.navigate("MainStack", { screen: item.navigate_to });
        onButtonPress(item.event);
      }}
      activeOpacity={0.5}
      style={[
        styles.item,
        { backgroundColor: "#FFFFFF", flexDirection: "row" },
      ]}
    >
      <Text
        style={{
          color: "#666666",
          fontSize: (screenHeight * 17) / 1000,
          fontWeight: "500",
          flex: 1,
        }}
      >
        {item.title}
      </Text>
      <Image source={icons["right-arrow"]} style={styles.buttonImage} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={[styles.container, { backgroundColor: "#F8F8F8" }]}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <FastImage style={[styles.image]} source={images.home_show_case} />

        <Text style={styles.screen_title}>{`calculate with`}</Text>

        <View
          style={[
            styles.calculate_filter,
            {
              alignItems: "center",
              paddingVertical: screenHeight * 0.017,
              backgroundColor: "#E0E0E0",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setFilterType("Metric");
              context.addUnit("Metric");
            }}
            style={[
              styles.sub_view1,
              {
                alignItems: "center",
                backgroundColor:
                  filterType === "Metric" ? "#008C00" : "#E0E0E0",
              },
            ]}
          >
            <Text
              style={{
                color: filterType === "Metric" ? "#FFFFFF" : "#666666",
                fontSize: (screenHeight * 15) / 1000,
                fontWeight: "500",
              }}
            >
              Metric
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterType("Imperial");
              context.addUnit("Imperial");
            }}
            style={[
              styles.sub_view2,
              {
                alignItems: "center",
                backgroundColor:
                  filterType === "Imperial" ? "#008C00" : "#E0E0E0",
              },
            ]}
          >
            <Text
              style={{
                color: filterType === "Imperial" ? "#FFFFFF" : "#666666",
                fontSize: (screenHeight * 15) / 1000,
                fontWeight: "500",
              }}
            >
              Imperial
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ marginTop: (screenHeight * 100) / 1000 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
});
