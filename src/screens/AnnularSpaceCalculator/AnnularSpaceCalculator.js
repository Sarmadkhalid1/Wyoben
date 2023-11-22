import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { icons, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";
import { colors } from "../../assets";

const AnnularSpaceCalculator = ({ navigation }) => {
  const [diameter, setDiameter] = useState("");
  const [diameterType, setDiameterType] = useState("inch");
  const [casingDiameter, setCasingDiameter] = useState("");
  const [casingDiameterType, setCasingDiameterType] = useState("inch");
  const [depth, setDepth] = useState("");
  const [depthType, setDepthType] = useState("feet");
  const [results, setResults] = useState(null);

  const handleSubmit = () => {
    const holeDiameter = parseFloat(diameter);
    const casingDiameterValue = parseFloat(casingDiameter);
    const holeDepth = parseFloat(depth);

    if (isNaN(holeDiameter) || isNaN(casingDiameterValue) || isNaN(holeDepth)) {
      // Handle invalid input
      return;
    }

    let annularVolume;
    let annularVolumeGallons;
    let annularVolumeCubicFt;
    let annularVolumeCubicMeter;

    if (diameterType === "centimeter") {
      annularVolume =
        ((holeDiameter * holeDiameter -
          casingDiameterValue * casingDiameterValue) /
          12.73) *
        holeDepth;
      annularVolumeGallons = annularVolume * 0.2641720524;
      annularVolumeCubicMeter = annularVolume / 1000;
    } else {
      annularVolume =
        ((holeDiameter * holeDiameter -
          casingDiameterValue * casingDiameterValue) /
          24.5) *
        holeDepth;
      annularVolumeGallons = annularVolume;
      annularVolumeCubicFt = annularVolume / 7.48;
    }

    setResults({
      annularVolumeCubicMeter,
      annularVolumeGallons,
      annularVolumeCubicFt,
    });
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Header
        title={"Back"}
        height={(screenHeight * 100) / 1000}
        width={screenWidth}
        paddingHorizontal={screenWidth * 0.02}
        showRightIcon={true}
        leftIconSource={icons.back}
        rightIconSource={icons.info}
        onBackPress={() => navigation.goBack()}
        tintColor={"#030104"}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Annular Space Calculator</Text>
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
          placeholder="O/S Casing Diameter"
          value={casingDiameter}
          onChangeText={setCasingDiameter}
          keyboardType="numeric"
        />
        <Picker
          style={styles.input}
          selectedValue={casingDiameterType}
          onValueChange={(itemValue) => setCasingDiameterType(itemValue)}
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
        <Button
          title="Calculate"
          onPress={handleSubmit}
          color={colors.primary}
        />

        {results && (
          <View style={styles.results}>
            <Text style={styles.resultHeader}>Results:</Text>
            {diameterType === "centimeter" ? (
              <>
                <Text>
                  Volume in Cubic Meters:{" "}
                  {results.annularVolumeCubicMeter.toFixed(2)} cubic meters
                </Text>
                <Text>Liters: {results.annularVolume.toFixed(2)} liters</Text>
              </>
            ) : (
              <>
                <Text>
                  Volume in Cubic Feet:{" "}
                  {results.annularVolumeCubicFt.toFixed(2)} cubic feet
                </Text>
                <Text>
                  Gallons: {results.annularVolumeGallons.toFixed(2)} gallons
                </Text>
              </>
            )}

            <Text>Approximate number of bags necessary for the hole:</Text>
            <Text>Dry Applications:</Text>
            <Text>
              Enviroplug Medium:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 5.5).toFixed(2)}{" "}
              bags
            </Text>
            <Text>Enviroplug Coarse: N/A</Text>
            <Text>
              Enviroplug #8 (Recommended for Dry Holes Only):{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 5.5).toFixed(2)}{" "}
              bags
            </Text>

            <Text>Slurry Applications, See individual product sheets:</Text>
            <Text>
              Enviroplug #16 & 20 @ 17% Solids:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 31).toFixed(2)}{" "}
              bags
            </Text>
            <Text>
              Enviroplug Grout @ 30% solids:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 17).toFixed(2)}{" "}
              bags
            </Text>
            <Text>
              Grout-Well "DF" @ 20% solids:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 27).toFixed(2)}{" "}
              bags
            </Text>
            <Text>
              Grout-Well @ 17% solids:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 31).toFixed(2)}{" "}
              bags
            </Text>
            <Text>
              TD-16 @ 17% solids:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 31).toFixed(2)}{" "}
              bags
            </Text>
            <Text>
              Therm-Ex Grout @ .93*:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 29).toFixed(2)}{" "}
              bags
            </Text>
            <Text>
              Therm-Ex Grout @ 1.05*:{" "}
              {results.annularVolumeGallons &&
                (results.annularVolumeGallons / 36).toFixed(2)}{" "}
              bags
            </Text>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
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
});

export default AnnularSpaceCalculator;
