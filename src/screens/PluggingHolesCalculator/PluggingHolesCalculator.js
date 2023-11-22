import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useTheme, useTranslations, TouchableIcon } from "../../core/dopebase";
import dynamicStyles from "./styles";
import { useCurrentUser } from "../../core/onboarding";
import { useAuth } from "../../core/onboarding/hooks/useAuth";
import { colors, icons, images, screenHeight, screenWidth } from "../../assets";
import Right from "react-native-vector-icons/FontAwesome";
import { Header } from "../../components/Header";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import home_show_case from '../../assets'

const PluggingHolesCalculator = memo((props) => {
  const navigation = useNavigation();

  const [holeDiameter, setHoleDiameter] = useState();
  const [depthofHole, setDepthofHole] = useState();

  const currentUser = useCurrentUser();
  const authManager = useAuth();

  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const renderItem = (
    filter1,
    filter2,
    subs_filter,
    setFilterValue,
    filterValue,
    marginTop
  ) => (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: marginTop,
          paddingBottom: screenHeight * 0.005,
        }}
      >
        <Text
          style={{
            fontSize: (screenHeight * 18) / 1000,
            color: "#A29E9E",
            fontWeight: "500",
            width: screenWidth * 0.7,
          }}
        >
          {filter1}
        </Text>
        <Text
          style={{
            fontSize: (screenHeight * 18) / 1000,
            color: "#A29E9E",
            fontWeight: "500",
            marginRight: screenWidth * 0.05,
          }}
        >
          {filter2}
        </Text>
      </View>
      <View style={[styles.filter, { flexDirection: "row" }]}>
        <View style={[styles.hole_diameter, {}]}>
          <TextInput
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              color: "black",
            }}
            keyboardType="numeric"
            placeholder=""
            onChangeText={(text) => setFilterValue(text) && console.log(text)} // Handle text changes
            value={filterValue} // Set the input value
          />
        </View>
        <View
          style={[
            styles.metric1,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            },
          ]}
        >
          <Text>{subs_filter}</Text>
          <Image
            source={icons["right-arrow"]}
            style={{
              height: screenHeight * 0.015,
              width: screenWidth * 0.015,
              marginLeft: screenWidth * 0.01,
            }}
          ></Image>
        </View>
      </View>
    </>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, { backgroundColor: "#F8F8F8" }]}
    >
      <Header
        title={"Back"}
        height={(screenHeight * 100) / 1000}
        width={screenWidth}
        paddingHorizontal={screenWidth * 0.02}
        showRightIcon={true}
        leftIconSource={icons.back}
        rightIconSource={icons.info}
        onBackPress={() => props.navigation.goBack()}
        tintColor={"#030104"}
      />

      <View
        style={[
          styles.top_title,
          { alignItems: "center", paddingVertical: screenHeight * 0.017 },
        ]}
      >
        <View style={[styles.sub_view1, { alignItems: "center" }]}>
          <Text
            style={{
              color: "#666666",
              fontSize: (screenHeight * 21) / 1000,
              fontWeight: "500",
            }}
          >
            PLUGGIN HOLES OR CASING
          </Text>
        </View>
      </View>
      {renderItem(
        "Hole Diameter",
        "Metric",
        "Inches",
        setHoleDiameter,
        holeDiameter,
        screenHeight * 0.08
      )}
      {renderItem(
        "Depth of Hole",
        "Metric",
        "Feet",
        setDepthofHole,
        depthofHole,
        screenHeight * 0.045
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Results")}
        style={[
          styles.top_title,
          {
            alignItems: "center",
            justifyContent: "center",
            marginTop: screenHeight * 0.05,
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: (screenHeight * 26) / 1000,
            fontWeight: "500",
          }}
        >
          Calculate
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
});

export default PluggingHolesCalculator;
