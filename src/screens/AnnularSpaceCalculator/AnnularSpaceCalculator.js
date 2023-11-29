import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "../../components/Header";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { DopebaseContext } from "../../core/dopebase";
import Button from "../../components/Button";

const AnnularSpaceCalculator = ({ navigation }) => {
  const context = useContext(DopebaseContext);
  const [diameter, setDiameter] = useState("");
  const [diameterType, setDiameterType] = useState(
    context?.unit === "Imperial" ? "inch" : "centimeter"
  );
  const [casingDiameter, setCasingDiameter] = useState("");
  const [casingDiameterType, setCasingDiameterType] = useState(
    context?.unit === "Imperial" ? "inch" : "centimeter"
  );
  const [depth, setDepth] = useState("");
  const [depthType, setDepthType] = useState(
    context?.unit === "Imperial" ? "feet" : "meters"
  );
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

    // setResults(
    //   {
    //     annularVolumeCubicMeter,
    //     annularVolumeGallons,
    //     annularVolumeCubicFt,
    //   },
    //   () => {
    //     navigation.navigate("Results", {
    //       results: results,
    //       type: "AnnularSpaceCalculator",
    //     });
    //   }
    // );

    setResults({
      annularVolumeCubicMeter,
      annularVolumeGallons,
      annularVolumeCubicFt,
    });
    // navigation.navigate("Results", {
    //   results: results,
    //   type: "AnnularSpaceCalculator",
    // });
  };

  useEffect(() => {
    // This effect will run after the component renders
    if (results) {
      navigation.navigate("Results", {
        results: results,
        type: "AnnularSpaceCalculator",
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

        <Text style={styles.textStyle}>
          For GEOTHERMAL LOOPS use the following as casing diameters:
        </Text>
        <Text style={styles.textStyle}>3/4" Loop = 1.5"</Text>
        <Text style={styles.textStyle}>1" Loop = 2.0"</Text>
        <Text style={styles.textStyle}>1-1/4 "Loop = 2.3"</Text>

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
        <Button title="Calculate" onPress={handleSubmit} />

        {/* {results && (
          <View style={styles.results}>
            <Text style={styles.resultHeader}>Results:</Text>
            {diameterType === "centimeter" ? (
              <>
                <Text>
                  Volume in Cubic Meters:{" "}
                  {Math.round(results.annularVolumeCubicMeter)} cubic meters
                </Text>
                <Text>Liters: {Math.round(results.annularVolume)} liters</Text>
              </>
            ) : (
              <>
                <Text>
                  Volume in Cubic Feet:{" "}
                  {Math.round(results.annularVolumeCubicFt)} cubic feet
                </Text>
                <Text>
                  Gallons: {Math.round(results.annularVolumeGallons)} gallons
                </Text>
              </>
            )}

            <Text>Approximate number of bags necessary for the hole:</Text>
            <Text>Dry Applications:</Text>
            <Text>
              Enviroplug Medium:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 5.5)}{" "}
              bags
            </Text>
            <Text>Enviroplug Coarse: N/A</Text>
            <Text>
              Enviroplug #8 (Recommended for Dry Holes Only):{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 5.5)}{" "}
              bags
            </Text>

            <Text>Slurry Applications, See individual product sheets:</Text>
            <Text>
              Enviroplug #16 & 20 @ 17% Solids:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 31)}{" "}
              bags
            </Text>
            <Text>
              Enviroplug Grout @ 30% solids:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 17)}{" "}
              bags
            </Text>
            <Text>
              Grout-Well "DF" @ 20% solids:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 27)}{" "}
              bags
            </Text>
            <Text>
              Grout-Well @ 17% solids:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 31)}{" "}
              bags
            </Text>
            <Text>
              TD-16 @ 17% solids:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 31)}{" "}
              bags
            </Text>
            <Text>
              Therm-Ex Grout @ .93*:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 29)}{" "}
              bags
            </Text>
            <Text>
              Therm-Ex Grout @ 1.05*:{" "}
              {results.annularVolumeGallons &&
                Math.round(results.annularVolumeGallons / 36)}{" "}
              bags
            </Text>
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
  textStyle: {
    color: "black",
    margin: 2,
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
