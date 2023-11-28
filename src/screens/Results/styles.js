import { StyleSheet, StatusBar } from "react-native";
import { colors, screenHeight, screenWidth } from "../../assets";

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance];

  return StyleSheet.create({
    buttonImage: {
      width: (screenHeight * 28) / 1000,
      height: (screenHeight * 28) / 1000,
      tintColor: "#E0E0E0",
      // fontWeight:'900',
    },
    item: {
      width: screenWidth,
      height: (screenHeight * 75) / 1000,
      padding: (screenHeight * 22) / 1000,
      borderBottomWidth: 0.7, // Add a border line at the bottom
      borderBottomColor: "#ccc", // Border color,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "space-around",
    },
    // visit_our_site:{

    // },
    share: {
      width: screenWidth * 0.9,
      height: (screenHeight * 60) / 1000,
      borderRadius: 100,
      backgroundColor: "#E0E0E0",
      marginTop: screenHeight * 0.08,
    },

    table: {
      borderWidth: 0.3,
      margin: 10,
    },
    makeupResults: {
      marginTop: 10,
    },
    drillinFluidRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 0.3,
      borderBottomColor: "black",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.3,
      borderBottomColor: "black",
    },
    tableCell: {
      // flex: 1,
      padding: 8,
    },
    headerCell: {
      fontWeight: "bold",
    },
    // Annular velocity Air styles
    results: {
      marginTop: 20,
    },
    resultHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    alert: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    alertIcon: {
      fontSize: 20,
      marginRight: 5,
    },
    alertText: {
      flex: 1,
      color: "red",
    },
  });
};

export default dynamicStyles;
