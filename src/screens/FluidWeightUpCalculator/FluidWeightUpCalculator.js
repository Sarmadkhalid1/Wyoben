import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Header } from "../../components/Header";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DopebaseContext } from "../../core/dopebase";
import Button from "../../components/Button";

const FluidWeightUpCalculator = ({ navigation }) => {
  const context = useContext(DopebaseContext);
  const [existingMud, setExistingMud] = useState("");
  const [existingMudType, setExistingMudType] = useState(
    context?.unit === "Imperial" ? "lbs gal" : "kgs/m3"
  );
  const [desiredMud, setDesiredMud] = useState("");
  const [desiredMudType, setDesiredMudType] = useState(
    context?.unit === "Imperial" ? "lbs gal" : "kgs/m3"
  );
  const [results, setResults] = useState(null);

  const calculateResults = () => {
    if (!existingMud || !desiredMud) {
      // Handle input validation here, if needed
      return;
    }

    let baritePerBarrel;
    let volIncreaseInBarrels;

    if (existingMudType === "lbs gal") {
      baritePerBarrel = (1471 * (desiredMud - existingMud)) / (35 - desiredMud);
      volIncreaseInBarrels = baritePerBarrel / 1471;
    } else {
      baritePerBarrel =
        (4100 * (desiredMud - existingMud)) / (4100 - existingMud);
      volIncreaseInBarrels = baritePerBarrel / 4100;
    }

    const bariteAddPer100 = baritePerBarrel * 100;
    const volIncPer100 = volIncreaseInBarrels * 100;

    setResults({
      baritePerBarrel:
        Math.round(baritePerBarrel) +
        (existingMudType === "lbs gal" ? " lbs/bbl" : " kgs/bbl"),
      volIncreaseInBarrels: Math.round(volIncreaseInBarrels) + " bbls/bbl",
      bariteAddPer100:
        Math.round(bariteAddPer100) +
        (existingMudType === "lbs gal" ? " lbs" : " kgs"),
      volIncPer100: Math.round(volIncPer100) + " bbls",
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
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 20,
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Weight of the existing drilling mud
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={existingMud}
          onChangeText={(text) => setExistingMud(text)}
        />
        <Picker
          selectedValue={existingMudType}
          onValueChange={(itemValue) => setExistingMudType(itemValue)}
        >
          <Picker.Item label="lbs gal" value="lbs gal" />
          <Picker.Item label="kgs/m3" value="kgs/m3" />
        </Picker>

        <Text style={styles.labelStyle}>Desired weight of drilling mud</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={desiredMud}
          onChangeText={(text) => setDesiredMud(text)}
        />
        <Picker
          selectedValue={desiredMudType}
          onValueChange={(itemValue) => setDesiredMudType(itemValue)}
        >
          <Picker.Item label="lbs gal" value="lbs gal" />
          <Picker.Item label="kgs/m3" value="kgs/m3" />
        </Picker>

        <Button title="Calculate" onPress={calculateResults} />

        {results && (
          <View>
            <Text style={styles.resultStyle}>Results</Text>
            <View>
              <Text>Barite Addition per Barrel: {results.baritePerBarrel}</Text>
              <Text>Fluid Volume Increase: {results.volIncreaseInBarrels}</Text>
              <Text>
                Barite Addition per 100bbls: {results.bariteAddPer100}
              </Text>
              <Text>
                Fluid Volume Increase per 100bbls: {results.volIncPer100}
              </Text>
            </View>
          </View>
        )}
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

export default FluidWeightUpCalculator;
