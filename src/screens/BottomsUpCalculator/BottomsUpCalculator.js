import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Header } from "../../components/Header";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DopebaseContext } from "../../core/dopebase";
import Button from "../../components/Button";
import { useFocusEffect } from "@react-navigation/native";

const BottomsUpCalculator = ({ navigation }) => {
  const context = useContext(DopebaseContext);
  const [holeDiameter, setHoleDiameter] = useState("");
  const [holeDiameterType, setHoleDiameterType] = useState(
    context?.unit === "Imperial" ? "inch" : "millimeter"
  );
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [pipeDiameterType, setPipeDiameterType] = useState(
    context?.unit === "Imperial" ? "inch" : "millimeter"
  );
  const [depthLength, setDepthLength] = useState("");
  const [depthLengthType, setDepthLengthType] = useState(
    context?.unit === "Imperial" ? "feet" : "meters"
  );
  const [pumpOutput, setPumpOutput] = useState("");
  const [pumpOutputType, setPumpOutputType] = useState(
    context?.unit === "Imperial" ? "gallons" : "liters"
  );
  const [results, setResults] = useState(null);

  const calculateResults = () => {
    if (!holeDiameter || !pipeDiameter || !depthLength || !pumpOutput) {
      // Handle input validation here, if needed
      return;
    }

    let result;

    if (holeDiameterType === "millimeter") {
      result =
        (((holeDiameter * holeDiameter - pipeDiameter * pipeDiameter) / 1273) *
          depthLength) /
        pumpOutput;
    } else {
      result =
        (((holeDiameter * holeDiameter - pipeDiameter * pipeDiameter) / 24.5) *
          depthLength) /
        pumpOutput;
    }

    setResults(result.toFixed(2));
  };

  useEffect(() => {
    // This effect will run after the component renders
    if (results) {
      navigation.navigate("Results", {
        results: results,
        type: "BottomsUpCalculator",
      });
    }
  }, [results, navigation]);

  useFocusEffect(
    useCallback(() => {
      setResults(null);
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
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 20,
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Hole Diameter
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter diameter"
          keyboardType="numeric"
          value={holeDiameter}
          onChangeText={(text) => setHoleDiameter(text)}
        />
        <Picker
          selectedValue={holeDiameterType}
          onValueChange={(itemValue) => setHoleDiameterType(itemValue)}
        >
          <Picker.Item label="Inches" value="inch" />
          <Picker.Item label="Millimeter" value="millimeter" />
        </Picker>

        <Text style={styles.labelStyle}>Pipe Diameter</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter diameter"
          keyboardType="numeric"
          value={pipeDiameter}
          onChangeText={(text) => setPipeDiameter(text)}
        />
        <Picker
          selectedValue={pipeDiameterType}
          onValueChange={(itemValue) => setPipeDiameterType(itemValue)}
        >
          <Picker.Item label="Inches" value="inch" />
          <Picker.Item label="Millimeter" value="millimeter" />
        </Picker>

        <Text style={styles.labelStyle}>Depth or Length</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter depth or length"
          keyboardType="numeric"
          value={depthLength}
          onChangeText={(text) => setDepthLength(text)}
        />
        <Picker
          selectedValue={depthLengthType}
          onValueChange={(itemValue) => setDepthLengthType(itemValue)}
        >
          <Picker.Item label="Feet" value="feet" />
          <Picker.Item label="Meters" value="meters" />
        </Picker>

        <Text style={styles.labelStyle}>Pump Output</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pump output"
          keyboardType="numeric"
          value={pumpOutput}
          onChangeText={(text) => setPumpOutput(text)}
        />
        <Picker
          selectedValue={pumpOutputType}
          onValueChange={(itemValue) => setPumpOutputType(itemValue)}
        >
          <Picker.Item label="Gallons per minute" value="gallons" />
          <Picker.Item label="Liters per minute" value="liters" />
        </Picker>

        <Button title="Calculate" onPress={calculateResults} />

        {/* {results && (
          <View>
            <Text style={styles.resultStyle}>Results</Text>
            <Text>Bottoms Up Time: {results} Minutes</Text>
          </View>
        )} */}
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    color: "black",
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "black",
  },
  resultStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BottomsUpCalculator;
