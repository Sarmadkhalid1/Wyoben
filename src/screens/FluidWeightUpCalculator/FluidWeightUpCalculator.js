import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const FluidWeightUpCalculator = () => {
  const [existingMud, setExistingMud] = useState('')
  const [existingMudType, setExistingMudType] = useState('lbs gal')
  const [desiredMud, setDesiredMud] = useState('')
  const [desiredMudType, setDesiredMudType] = useState('lbs gal')
  const [results, setResults] = useState(null)

  const calculateResults = () => {
    if (!existingMud || !desiredMud) {
      // Handle input validation here, if needed
      return
    }

    let baritePerBarrel
    let volIncreaseInBarrels

    if (existingMudType === 'lbs gal') {
      baritePerBarrel = (1471 * (desiredMud - existingMud)) / (35 - desiredMud)
      volIncreaseInBarrels = baritePerBarrel / 1471
    } else {
      baritePerBarrel =
        (4100 * (desiredMud - existingMud)) / (4100 - existingMud)
      volIncreaseInBarrels = baritePerBarrel / 4100
    }

    const bariteAddPer100 = baritePerBarrel * 100
    const volIncPer100 = volIncreaseInBarrels * 100

    setResults({
      baritePerBarrel:
        baritePerBarrel.toFixed(2) +
        (existingMudType === 'lbs gal' ? ' lbs/bbl' : ' kgs/bbl'),
      volIncreaseInBarrels: volIncreaseInBarrels.toFixed(4) + ' bbls/bbl',
      bariteAddPer100:
        bariteAddPer100.toFixed(2) +
        (existingMudType === 'lbs gal' ? ' lbs' : ' kgs'),
      volIncPer100: volIncPer100.toFixed(2) + ' bbls',
    })
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Weight of the existing drilling mud</Text>
      <TextInput
        placeholder="Enter weight"
        keyboardType="numeric"
        value={existingMud}
        onChangeText={text => setExistingMud(text)}
      />
      <Picker
        selectedValue={existingMudType}
        onValueChange={itemValue => setExistingMudType(itemValue)}>
        <Picker.Item label="lbs gal" value="lbs gal" />
        <Picker.Item label="kgs/m3" value="kgs/m3" />
      </Picker>

      <Text>Desired weight of drilling mud</Text>
      <TextInput
        placeholder="Enter weight"
        keyboardType="numeric"
        value={desiredMud}
        onChangeText={text => setDesiredMud(text)}
      />
      <Picker
        selectedValue={desiredMudType}
        onValueChange={itemValue => setDesiredMudType(itemValue)}>
        <Picker.Item label="lbs gal" value="lbs gal" />
        <Picker.Item label="kgs/m3" value="kgs/m3" />
      </Picker>

      <Button title="Calculate" onPress={calculateResults} />

      {results && (
        <View>
          <Text>Results</Text>
          <View>
            <Text>Barite Addition per Barrel: {results.baritePerBarrel}</Text>
            <Text>Fluid Volume Increase: {results.volIncreaseInBarrels}</Text>
            <Text>Barite Addition per 100bbls: {results.bariteAddPer100}</Text>
            <Text>
              Fluid Volume Increase per 100bbls: {results.volIncPer100}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default FluidWeightUpCalculator
