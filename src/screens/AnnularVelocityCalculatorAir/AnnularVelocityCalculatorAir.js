import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { icons, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";
import { colors } from "../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button";
import { useFocusEffect } from "@react-navigation/native";

const AnnularVelocityCalculatorAir = ({ navigation }) => {
  const [compressorOutput, setCompressorOutput] = useState("");
  const [holeDiameter, setHoleDiameter] = useState("");
  const [drillPipeDiameter, setDrillPipeDiameter] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const cubic = parseFloat(compressorOutput);
    const diameter = parseFloat(holeDiameter);
    const drill = parseFloat(drillPipeDiameter);

    if (isNaN(cubic) || isNaN(diameter) || isNaN(drill)) {
      // Handle invalid input
      return;
    }

    const calculatedResult =
      cubic * (183.4 / (Math.pow(diameter, 2) - Math.pow(drill, 2)));

    setResult(calculatedResult);
  };

  useEffect(() => {
    // This effect will run after the component renders
    if (result) {
      navigation.navigate("Results", {
        results: result,
        type: "AnnularVelocityCalculatorAir",
      });
    }
  }, [result, navigation]);

  useFocusEffect(
    useCallback(() => {
      setResult(null);
    }, [])
  );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Header
        title={"Back"}
        height={(screenHeight * 100) / 1000}
        width={screenWidth}
        paddingHorizontal={screenWidth * 0.02}
        leftIconSource={icons.back}
        onBackPress={() => navigation.goBack()}
        tintColor={"#030104"}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Annular Velocity Calculator (Air)</Text>
        <TextInput
          style={styles.input}
          placeholder="Compressor output in CFM"
          value={compressorOutput}
          onChangeText={setCompressorOutput}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Hole Diameter Inches"
          value={holeDiameter}
          onChangeText={setHoleDiameter}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Drill Pipe Diameter Inches"
          value={drillPipeDiameter}
          onChangeText={setDrillPipeDiameter}
          keyboardType="numeric"
        />
        <Button title="Calculate" onPress={handleSubmit} />

        {/* {result !== null && (
          <View style={styles.results}>
            <Text style={styles.resultHeader}>Results:</Text>
            <Text>{Math.round(result)} Ft / Min</Text>

            {result < 3000 && (
              <View style={styles.alert}>
                <Text style={styles.alertIcon}>⚠️</Text>
                <Text style={styles.alertText}>
                  Annular velocity is below recommended values for hole
                  cleaning. Minimum result value is 3000 feet / min. Please
                  adjust input value 1 to achieve a result greater than 3000
                  feet / min.
                </Text>
              </View>
            )}
          </View>
        )} */}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    color: "black",
  },
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

export default AnnularVelocityCalculatorAir;
