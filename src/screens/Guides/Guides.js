import React, { memo } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../core/dopebase";
import dynamicStyles from "./styles";
import { icons, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";
import WebView from "react-native-webview";

export const Guides = memo((props) => {
  const { navigation } = props;
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const data = [
    {
      id: "1",
      title: "Product Application",
      navigate_to: "ProductApplication",
    },
    {
      id: "2",
      title: "Product Usage & Cross Reference",
      navigate_to: "ProductApplication",
    },
    {
      id: "3",
      title: "Internal Flush Drillpipe",
      navigate_to: "ProductApplication",
    },
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
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={"User Guides"}
        height={(screenHeight * 100) / 1000}
        width={screenWidth}
        paddingHorizontal={screenWidth * 0.02}
        showRightIcon={false}
        showTitleInCenter={true}
        leftIconSource={icons.cross}
        tintColor={"#000000"}
        backgroundColor={"#ffffff"}
        onBackPress={() => navigation.goBack()}
      />
      <WebView source={{ uri: "https://www.wyoben.com/resources/" }} />
    </SafeAreaView>
    // <>
    //   <View style={{ backgroundColor: "#F8F8F8" }}>
    //     <Header
    //       title={"User Guides"}
    //       height={(screenHeight * 100) / 1000}
    //       width={screenWidth}
    //       paddingHorizontal={screenWidth * 0.02}
    //       showRightIcon={false}
    //       showTitleInCenter={true}
    //       leftIconSource={icons.cross}
    //       tintColor={"#000000"}
    //       onBackPress={() => navigation.goBack()}
    //     />
    //     <FlatList
    //       data={data}
    //       keyExtractor={(item) => item.id}
    //       renderItem={renderItem}
    //     />
    //   </View>
    // </>
  );
});
