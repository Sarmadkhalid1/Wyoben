import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { icons, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";

const TermsOfUse = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={"Terms of Use"}
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
      <WebView
        source={{ uri: "https://www.wyoben.com/terms-and-conditions/" }}
      />
    </SafeAreaView>
  );
};

export default TermsOfUse;
