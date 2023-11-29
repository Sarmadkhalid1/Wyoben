import React, { memo, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { colors, icons, images, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";
import { useTheme, useTranslations } from "../../core/dopebase";
import { useCurrentUser } from "../../core/onboarding";
import { useAuth } from "../../core/onboarding/hooks/useAuth";
import dynamicStyles from "../home/styles";

const HVC = memo((props) => {
  const { navigation } = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();

  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);
  const [filterType, setFilterType] = useState("Metric");
  const data = [
    {
      id: "1",
      title: "Plugging Hole or Casing",
      navigate_to: "PluggingHolesCalculator",
    },
    {
      id: "2",
      title: "Annular Space",
      navigate_to: "AnnularSpaceCalculator",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        item.navigate_to &&
        navigation.navigate("MainStack", { screen: item.navigate_to })
      }
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
        <Header
          title={"Back"}
          height={(screenHeight * 100) / 1000}
          width={screenWidth}
          paddingHorizontal={screenWidth * 0.02}
          // showRightIcon={true}
          leftIconSource={icons.back}
          // rightIconSource={icons.info}
          onBackPress={() => navigation.goBack()}
          tintColor={"#030104"}
        />
        {/* <Text style={styles.screen_title}>{`calculate with`}</Text> */}

        {/* <View
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
            onPress={() => setFilterType("Metric")}
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
            onPress={() => setFilterType("Imperial")}
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
        </View> */}

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

export default HVC;
