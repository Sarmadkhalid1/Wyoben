import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Header } from "../../components/Header";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button";

const DrillingFluidCalculator = ({ navigation }) => {
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [formation, setFormation] = useState("");
  const [makeup, setMakeup] = useState("");
  const [results, setResults] = useState(null);

  const drillingCalcs = [
    { drilling_id: 1, fluid_makeup: "Tru-Bore", makeup_id: 1 },
    { drilling_id: 2, fluid_makeup: "Tru-Bore & Uni-Drill", makeup_id: 2 },
    { drilling_id: 4, fluid_makeup: "Tru-Bore & Wyo-Vis LVP", makeup_id: 3 },
    {
      drilling_id: 6,
      fluid_makeup: "Extra High Yield & Claymaster",
      makeup_id: 4,
    },
    { drilling_id: 7, fluid_makeup: "Ext Hi Yield & Uni-Drill", makeup_id: 5 },
    {
      drilling_id: 10,
      fluid_makeup: "Ext Hi Yield & Wyo-Vis LVP",
      makeup_id: 6,
    },
    { drilling_id: 11, fluid_makeup: "Wyo-Vis DP", makeup_id: 7 },
    { drilling_id: 12, fluid_makeup: "Wyo-Vis HP", makeup_id: 8 },
    { drilling_id: 13, fluid_makeup: "Wyo-Vis LVP", makeup_id: 9 },
    { drilling_id: 14, fluid_makeup: "Borzan", makeup_id: 10 },
    { drilling_id: 15, fluid_makeup: "Kwik-Vis D", makeup_id: 11 },
  ];

  const drillingCalculations = [
    {
      drilling_id: 1,
      fluid_makeup: "Tru-Bore",
      cobble: "30 lbs",
      sand_gravel: "25 lbs",
      sandy_clay: "22.5 lbs",
      clay: "18 lbs",
      reactive_clay: "12 lbs",
      makeup_id: 1,
    },
    {
      drilling_id: 6,
      fluid_makeup: "Extra High Yield & Claymaster",
      cobble: 0,
      sand_gravel: 0,
      sandy_clay: "27 lbs",
      clay: "23 lbs",
      reactive_clay: "20 lbs",
      cobble_two: 0,
      sand_gravel_two: 0,
      sandy_clay_two: ".5 qt - 1 qt",
      clay_two: "1 qt - 1.5 qts",
      reactive_clay_two: "2 qts",
      makeup_id: 4,
    },
    {
      drilling_id: 8,
      fluid_makeup: "Ext Hi Yield & Uni-Drill",
      cobble: "30 lbs",
      sand_gravel: "25 lbs",
      sandy_clay: "20 lbs",
      clay: "17.5 lbs",
      reactive_clay: "15 lbs",
      cobble_two: "11 fl oz",
      sand_gravel_two: "19 fl oz",
      sandy_clay_two: "26 fl oz",
      clay_two: "1.2 qts",
      reactive_clay_two: "1.5 qts",
      makeup_id: 5,
    },
    {
      drilling_id: 10,
      fluid_makeup: "Ext Hi Yield & Wyo-Vis LVP",
      cobble: "30 lbs",
      sand_gravel: "25 lbs",
      sandy_clay: "20 lbs",
      clay: "17.5 lbs",
      reactive_clay: "15 lbs",
      cobble_two: "5 oz",
      sand_gravel_two: "7 oz",
      sandy_clay_two: "11 oz",
      clay_two: "1 lb",
      reactive_clay_two: "1.5 lbs",
      makeup_id: 6,
    },
    {
      drilling_id: 12,
      fluid_makeup: "Wyo-Vis DP",
      cobble: 0,
      sand_gravel: 0,
      sandy_clay: "1 lb",
      clay: "12 oz",
      reactive_clay: "12 oz",
      makeup_id: 7,
    },
    {
      drilling_id: 13,
      fluid_makeup: "Wyo-Vis HP",
      cobble: 0,
      sand_gravel: 0,
      sandy_clay: "1.5 qts",
      clay: "1 qt",
      reactive_clay: "1 qt",
      makeup_id: 8,
    },
    {
      drilling_id: 14,
      fluid_makeup: "Wyo-Vis LVP",
      cobble: 0,
      sand_gravel: 0,
      sandy_clay: "2.5 lbs",
      clay: "2 lbs",
      reactive_clay: "2 lbs",
      makeup_id: 9,
    },
    {
      drilling_id: 15,
      fluid_makeup: "Borzan",
      cobble: "5 lbs",
      sand_gravel: "4 lbs",
      sandy_clay: "3 lbs",
      clay: 0,
      reactive_clay: 0,
      makeup_id: 10,
    },
    {
      drilling_id: 16,
      fluid_makeup: "Kwik-Vis D",
      cobble: 0,
      sand_gravel: 0,
      sandy_clay: "1.25 lbs",
      clay: "12 oz",
      reactive_clay: "8 oz",
      makeup_id: 11,
    },
  ];

  const handleSubmit = () => {
    const boreDiameter = parseFloat(diameter);
    const boreLength = parseFloat(length);
    const selectedFormation = parseInt(formation);
    const selectedMakeup = makeup;

    if (
      isNaN(boreDiameter) ||
      isNaN(boreLength) ||
      selectedFormation === 0 ||
      selectedMakeup === ""
    ) {
      // Handle invalid input
      return;
    }

    const gal = (boreDiameter * boreDiameter) / 24.5;
    const boreVolume = gal * boreLength;
    const tot = boreVolume * 2;
    const totResult = tot / 100;

    let multiplier = 1;
    let formationName = "";

    switch (selectedFormation) {
      case 1:
        formationName = "cobble";
        break;
      case 2:
        formationName = "sand_gravel";
        multiplier = 2;
        break;
      case 3:
        formationName = "sandy_clay";
        multiplier = 3;
        break;
      case 4:
        formationName = "clay";
        multiplier = 4;
        break;
      case 5:
        formationName = "reactive_clay";
        multiplier = 5;
        break;
      default:
        break;
    }

    const recPumpVol = boreVolume * multiplier;

    const filteredResults = drillingCalculations.filter(
      (calc) => calc.fluid_makeup === selectedMakeup
    );
    const makeupResults = [];

    filteredResults.forEach((result) => {
      makeupResults.push(
        `${result.fluid_makeup.split("&")[0]}: ${result[formationName]}`
      );
      if (result[formationName + "_two"]) {
        makeupResults.push(
          `${result.fluid_makeup.split("&")[1]}: ${
            result[formationName + "_two"]
          }`
        );
      }
    });

    setResults({
      boreDiameter,
      boreLength,
      boreVolume: Math.round(boreVolume),
      multiplier,
      recPumpVol: Math.round(recPumpVol),
      makeupResults,
    });
  };

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
        showRightIcon={true}
        leftIconSource={icons.back}
        rightIconSource={icons.info}
        onBackPress={() => navigation.goBack()}
        tintColor={"#030104"}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Drilling Fluid Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Bore Diameter (inches)"
          value={diameter}
          onChangeText={setDiameter}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Bore Length (feet)"
          value={length}
          onChangeText={setLength}
          keyboardType="numeric"
        />
        <Picker
          style={styles.picker}
          selectedValue={formation}
          onValueChange={(itemValue) => setFormation(itemValue)}
        >
          <Picker.Item label="Select Formation" value="" />
          <Picker.Item label="COBBLE" value="1" />
          <Picker.Item label="SAND & GRAVEL" value="2" />
          <Picker.Item label="SANDY CLAY" value="3" />
          <Picker.Item label="CLAY" value="4" />
          <Picker.Item label="REACTIVE CLAY" value="5" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={makeup}
          onValueChange={(itemValue) => setMakeup(itemValue)}
        >
          <Picker.Item label="Select Fluid Makeup" value="" />
          {drillingCalcs.map((makeupItem) => (
            <Picker.Item
              key={makeupItem.fluid_makeup}
              label={makeupItem.fluid_makeup}
              value={makeupItem.fluid_makeup}
            />
          ))}
        </Picker>
        <Button title="Calculate" onPress={handleSubmit} />

        {results && (
          <View style={styles.results}>
            <Text style={styles.resultHeader}>Results:</Text>
            <Text>Bore Diameter: {results.boreDiameter} inches</Text>
            <Text>Bore Length: {results.boreLength} feet</Text>
            <Text>Total Hole Volume: {results.boreVolume} gals</Text>
            <Text>Soil Type Multiplier: {results.multiplier}</Text>
            <Text>Recommended Pump Volume: {results.recPumpVol} gals</Text>
            <View style={styles.makeupResults}>
              {results.makeupResults.map((resultLine, index) => (
                <Text key={index}>{resultLine}</Text>
              ))}
            </View>
          </View>
        )}
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
  picker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  results: {
    marginTop: 20,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  makeupResults: {
    marginTop: 10,
  },
});

export default DrillingFluidCalculator;
