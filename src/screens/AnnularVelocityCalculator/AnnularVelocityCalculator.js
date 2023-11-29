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
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  useTheme,
  useTranslations,
  TouchableIcon,
  DopebaseContext,
} from "../../core/dopebase";
import dynamicStyles from "../home/styles";
import { useCurrentUser } from "../../core/onboarding";
import { useAuth } from "../../core/onboarding/hooks/useAuth";
import { colors, icons, images, screenHeight, screenWidth } from "../../assets";
import Right from "react-native-vector-icons/FontAwesome";
import { Header } from "../../components/Header";

// import home_show_case from '../../assets'
const AnnularVelocityCalculator = memo((props) => {
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
      title: "Air",
      navigate_to: "AnnularVelocityCalculatorAir",
    },
    {
      id: "2",
      title: "Fluid",
      navigate_to: "AnnularVelocityCalculatorFluid",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => item.navigate_to && navigation.navigate(item.navigate_to)}
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
          leftIconSource={icons.back}
          onBackPress={() => navigation.goBack()}
          tintColor={"#030104"}
        />

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

export default AnnularVelocityCalculator;
