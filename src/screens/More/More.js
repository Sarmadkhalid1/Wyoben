import React, { memo } from "react";
import {
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";
import { useTheme } from "../../core/dopebase";
import dynamicStyles from "./styles";

// import home_show_case from '../../assets'

export const More = memo((props) => {
  const { navigation } = props;
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const openWebsite = () => {
    const url = "https://www.wyoben.com/";

    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL: ", err)
    );
  };

  const data = [
    { id: "1", title: "About Us", navigate_to: "AboutUs" },
    { id: "2", title: "Contact Us", navigate_to: "ContactUs" },
    { id: "3", title: "Terms of Use", navigate_to: "TermsOfUse" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.item,
        { backgroundColor: "#FFFFFF", flexDirection: "row" },
      ]}
      onPress={() => navigation.navigate(item.navigate_to)}
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
      <View
        style={{
          backgroundColor: "#F8F8F8",
          width: screenWidth,
          height: screenHeight,
        }}
      >
        <Header
          title={"Back"}
          height={(screenHeight * 100) / 1000}
          width={screenWidth}
          paddingHorizontal={screenWidth * 0.02}
          showRightIcon={false}
          leftIconSource={icons.back}
          onBackPress={() => navigation.goBack()}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />

        <TouchableOpacity
          style={[
            styles.visit_our_site,
            {
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
              position: "absolute",
              bottom: screenHeight * 0.15,
            },
          ]}
          onPress={openWebsite}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: (screenHeight * 20) / 1000,
              fontWeight: "500",
            }}
          >
            Visit our Website
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

// position: 'absolute',
//     bottom: 16, // Adjust this value to set the button's distance from the bottom
//     left: 0,
//     right: 0,
//     alignSelf: 'center','#F8F8F8'
