import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "../../components/Header";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { DopebaseContext } from "../../core/dopebase";
import Button from "../../components/Button";

const PluggingHolesCalculator = ({ navigation }) => {
  const context = useContext(DopebaseContext);
  console.log("Context Unit : ", context?.unit);
  const [diameter, setDiameter] = useState("");
  const [diameterType, setDiameterType] = useState(
    context?.unit === "Imperial" ? "inch" : "centimeter"
  );
  const [depth, setDepth] = useState("");
  const [depthType, setDepthType] = useState(
    context?.unit === "Imperial" ? "feet" : "meters"
  );
  const [results, setResults] = useState(null);

  const handleSubmit = () => {
    const holeDiameter = parseFloat(diameter);
    const holeDepth = parseFloat(depth);

    if (isNaN(holeDiameter) || isNaN(holeDepth)) {
      // Handle invalid input
      return;
    }

    let holeVolume;
    let holeVolumeGal;
    let holeVolumeCubicFt;
    let holeVolumeCubicMeter;

    if (diameterType === "centimeter") {
      holeVolume = ((holeDiameter * holeDiameter) / 12.73) * holeDepth;
      holeVolumeGal = holeVolume * 0.264172;
      holeVolumeCubicMeter = holeVolume / 1000;
    } else {
      holeVolume = ((holeDiameter * holeDiameter) / 24.5) * holeDepth;
      holeVolumeGal = holeVolume;
      holeVolumeCubicFt = holeVolume * 0.1337;
    }

    setResults({
      holeVolume: holeVolume, // Add this line
      holeVolumeCubicMeter: Math.round(holeVolumeCubicMeter * 100) / 100,
      holeVolumeGal: Math.round(holeVolumeGal * 100) / 100,
      holeVolumeCubicFt: Math.round(holeVolumeCubicFt * 100) / 100,
    });
  };

  useEffect(() => {
    // This effect will run after the component renders
    if (results) {
      navigation.navigate("Results", {
        results: results,
        type: "PluggingHolesCalculator",
      });
    }
  }, [results, navigation]);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.container}
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
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Plugging Holes Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Hole Diameter"
          value={diameter}
          onChangeText={setDiameter}
          keyboardType="numeric"
        />
        <Picker
          style={styles.input}
          selectedValue={diameterType}
          onValueChange={(itemValue) => setDiameterType(itemValue)}
        >
          <Picker.Item label="Inches" value="inch" />
          <Picker.Item label="Centimeters" value="centimeter" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Depth of Hole"
          value={depth}
          onChangeText={setDepth}
          keyboardType="numeric"
        />
        <Picker
          style={styles.input}
          selectedValue={depthType}
          onValueChange={(itemValue) => setDepthType(itemValue)}
        >
          <Picker.Item label="Feet" value="feet" />
          <Picker.Item label="Meters" value="meters" />
        </Picker>
        <Button title="Calculate" onPress={handleSubmit} />

        {/* {results && (
          <View style={styles.results}>
            <Text style={styles.resultHeader}>Results:</Text>
            {diameterType === "centimeter" ? (
              <>
                <Text>
                  Volume in Cubic Meters:{" "}
                  {Math.round(results.holeVolumeCubicMeter * 100) / 100} cubic
                  meters
                </Text>
                <Text>
                  Liters: {Math.round(results.holeVolume * 100) / 100} liters
                </Text>
              </>
            ) : (
              <>
                <Text>
                  Volume in Cubic Feet:{" "}
                  {Math.round(results.holeVolumeCubicFt * 100) / 100} cubic feet
                </Text>
                <Text>
                  Gallons: {Math.round(results.holeVolumeGal * 100) / 100}{" "}
                  gallons
                </Text>
              </>
            )}

            <Text>Approximate number of bags necessary for the hole:</Text>

            <Text>Dry Applications:</Text>
            <Text>
              Enviroplug Medium:{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 5.5)}{" "}
              bags
            </Text>
            <Text>
              Enviroplug Coarse:{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 5.5)}{" "}
              bags
            </Text>
            <Text>
              Enviroplug #8 (Recommended for Dry Holes Only):{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 5.5)}{" "}
              bags
            </Text>

            <Text>Slurry Applications, See individual product sheets:</Text>
            <Text>Enviroplug #16 &amp; 20 @ 17% Solids: N/A</Text>
            <Text>
              Enviroplug Grout @ 30% solids:{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 17)}{" "}
              bags
            </Text>
            <Text>
              Grout-Well "DF" @ 20% solids:{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 27)}{" "}
              bags
            </Text>
            <Text>
              Grout-Well @ 17% solids:{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 31)}{" "}
              bags
            </Text>
            <Text>
              TD-16 @ 17% solids:{" "}
              {results.holeVolumeGal && Math.round(results.holeVolumeGal / 31)}{" "}
              bags
            </Text>
            <Text>Therm-X Grout @ .93*: N/A</Text>
            <Text>Therm-X Grout @ 1.05*: N/A</Text>
            <Text>Therm-X Grout Plus*: N/A</Text>
          </View>
        )} */}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
  },
  results: {
    marginTop: 20,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PluggingHolesCalculator;
