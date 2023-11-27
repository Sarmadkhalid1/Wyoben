import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../assets";

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle}
      activeOpacity={0.8}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 20,
    paddingRight: 60,
    paddingLeft: 60,
    alignSelf: "center",
    marginTop: 20,
  },
  textStyle: {
    fontSize: 24,
    color: "white",
  },
});

export default Button;
