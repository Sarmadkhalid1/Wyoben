import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Header } from "../../components/Header";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button";

const DrillingCalculator = ({ navigation }) => {
  const [formation, setFormation] = useState("");
  const [inch, setInch] = useState("");
  const [rod, setRod] = useState("");
  const [results, setResults] = useState([]);

  const pumpCalcs = [
    {
      pump_id: 1,
      formation: "Cobble",
      hole_vol_ft: 1,
      6: 1.47,
      8: 2.61,
      10: 4.08,
      12: 5.87,
      16: 10.4,
      20: 16.3,
      24: 23.5,
      28: 32,
      36: 53,
    },
    {
      pump_id: 1,
      formation: "Sand_Gravel",
      hole_vol_ft: 1,
      6: 1.47,
      8: 2.61,
      10: 4.08,
      12: 5.87,
      16: 10.4,
      20: 16.3,
      24: 23.5,
      28: 32,
      36: 53,
    },
    {
      pump_id: 2,
      formation: "Sand_Gravel",
      hole_vol_ft: 2,
      6: 3,
      8: 5.2,
      10: 8.16,
      12: 11.8,
      16: 20.9,
      20: 32.6,
      24: 47,
      28: 64,
      36: 106,
    },
    {
      pump_id: 3,
      formation: "Sandy Clay",
      hole_vol_ft: 2,
      6: 3,
      8: 5.2,
      10: 8.16,
      12: 11.8,
      16: 20.9,
      20: 32.6,
      24: 47,
      28: 64,
      36: 106,
    },
    {
      pump_id: 4,
      formation: "Sandy Clay",
      hole_vol_ft: 3,
      6: 4.5,
      8: 8,
      10: 12.2,
      12: 17.6,
      16: 31.3,
      20: 49,
      24: 70.5,
      28: 96,
      36: 159,
    },
    {
      pump_id: 5,
      formation: "Clay",
      hole_vol_ft: 3,
      6: 4.5,
      8: 8,
      10: 12.2,
      12: 17.6,
      16: 31.3,
      20: 49,
      24: 70.5,
      28: 96,
      36: 159,
    },
    {
      pump_id: 6,
      formation: "Clay",
      hole_vol_ft: 4,
      6: 6,
      8: 10.5,
      10: 16.3,
      12: 23.5,
      16: 41.8,
      20: 65.3,
      24: 94,
      28: 128,
      36: 211,
    },
    {
      pump_id: 7,
      formation: "Reactive Clay",
      hole_vol_ft: 5,
      6: 7.5,
      8: 13,
      10: 20.4,
      12: 29.4,
      16: 52.2,
      20: 81.6,
      24: 118,
      28: 159,
      36: 264,
    },
  ];

  const calculateResults = () => {
    const newResults = [];

    for (const totResult of pumpCalcs) {
      if (totResult.formation === formation) {
        const get = Math.round(totResult[inch] * rod);
        newResults.push({
          formation: `${totResult.formation} ${totResult.hole_vol_ft} X Hole Volume`,
          result: `${get} gal./rod`,
        });
      }
    }

    setResults(newResults);
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
        s
        rightIconSource={icons.info}
        onBackPress={() => navigation.goBack()}
        tintColor={"#030104"}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20, alignSelf: "center" }}>
          Formation
        </Text>
        <Text style={styles.labelStyle}>Formation</Text>
        <Picker
          selectedValue={formation}
          onValueChange={(itemValue) => setFormation(itemValue)}
        >
          <Picker.Item label="Select Formation" value="" />
          <Picker.Item label="Cobble" value="Cobble" />
          <Picker.Item label="Sand/Gravel" value="Sand_Gravel" />
          <Picker.Item label="Sandy Clay" value="Sandy Clay" />
          <Picker.Item label="Clay" value="Clay" />
          <Picker.Item label="Reactive Clay" value="Reactive Clay" />
        </Picker>

        <Text style={styles.labelStyle}>Ream Diameter</Text>
        <Picker
          selectedValue={inch}
          onValueChange={(itemValue) => setInch(itemValue)}
        >
          <Picker.Item label="Select Diameter" value="" />
          <Picker.Item label="6 inch" value="6" />
          <Picker.Item label="8 inch" value="8" />
          <Picker.Item label="10 inch" value="10" />
          <Picker.Item label="12 inch" value="12" />
          <Picker.Item label="16 inch" value="16" />
          <Picker.Item label="20 inch" value="20" />
          <Picker.Item label="24 inch" value="24" />
          <Picker.Item label="28 inch" value="28" />
          <Picker.Item label="36 inch" value="36" />
        </Picker>

        <Text style={styles.labelStyle}>Rod Length</Text>
        <Picker
          selectedValue={rod}
          onValueChange={(itemValue) => setRod(itemValue)}
        >
          <Picker.Item label="Select Length" value="" />
          <Picker.Item label="10 foot rod length" value="10" />
          <Picker.Item label="15 foot rod length" value="15" />
        </Picker>

        <Button title="Calculate" onPress={calculateResults} />

        <View>
          <Text style={styles.labelStyle}>Results</Text>
          {results.map((result, index) => (
            <View key={index}>
              <Text>{result.formation}</Text>
              <Text>{result.result}</Text>
            </View>
          ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "black",
  },
});

export default DrillingCalculator;
