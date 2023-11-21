import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const BottomsUpCalculator = () => {
  const [holeDiameter, setHoleDiameter] = useState('')
  const [holeDiameterType, setHoleDiameterType] = useState('inch')
  const [pipeDiameter, setPipeDiameter] = useState('')
  const [pipeDiameterType, setPipeDiameterType] = useState('inch')
  const [depthLength, setDepthLength] = useState('')
  const [depthLengthType, setDepthLengthType] = useState('feet')
  const [pumpOutput, setPumpOutput] = useState('')
  const [pumpOutputType, setPumpOutputType] = useState('gallons')
  const [results, setResults] = useState(null)

  const calculateResults = () => {
    if (!holeDiameter || !pipeDiameter || !depthLength || !pumpOutput) {
      // Handle input validation here, if needed
      return
    }

    let result

    if (holeDiameterType === 'millimeter') {
      result =
        (((holeDiameter * holeDiameter - pipeDiameter * pipeDiameter) / 1273) *
          depthLength) /
        pumpOutput
    } else {
      result =
        (((holeDiameter * holeDiameter - pipeDiameter * pipeDiameter) / 24.5) *
          depthLength) /
        pumpOutput
    }

    setResults(result.toFixed(2))
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Hole Diameter</Text>
      <TextInput
        placeholder="Enter diameter"
        keyboardType="numeric"
        value={holeDiameter}
        onChangeText={text => setHoleDiameter(text)}
      />
      <Picker
        selectedValue={holeDiameterType}
        onValueChange={itemValue => setHoleDiameterType(itemValue)}>
        <Picker.Item label="Inches" value="inch" />
        <Picker.Item label="Millimeter" value="millimeter" />
      </Picker>

      <Text>Pipe Diameter</Text>
      <TextInput
        placeholder="Enter diameter"
        keyboardType="numeric"
        value={pipeDiameter}
        onChangeText={text => setPipeDiameter(text)}
      />
      <Picker
        selectedValue={pipeDiameterType}
        onValueChange={itemValue => setPipeDiameterType(itemValue)}>
        <Picker.Item label="Inches" value="inch" />
        <Picker.Item label="Millimeter" value="millimeter" />
      </Picker>

      <Text>Depth or Length</Text>
      <TextInput
        placeholder="Enter depth or length"
        keyboardType="numeric"
        value={depthLength}
        onChangeText={text => setDepthLength(text)}
      />
      <Picker
        selectedValue={depthLengthType}
        onValueChange={itemValue => setDepthLengthType(itemValue)}>
        <Picker.Item label="Feet" value="feet" />
        <Picker.Item label="Meters" value="meters" />
      </Picker>

      <Text>Pump Output</Text>
      <TextInput
        placeholder="Enter pump output"
        keyboardType="numeric"
        value={pumpOutput}
        onChangeText={text => setPumpOutput(text)}
      />
      <Picker
        selectedValue={pumpOutputType}
        onValueChange={itemValue => setPumpOutputType(itemValue)}>
        <Picker.Item label="Gallons per minute" value="gallons" />
        <Picker.Item label="Liters per minute" value="liters" />
      </Picker>

      <Button title="Calculate" onPress={calculateResults} />

      {results && (
        <View>
          <Text>Results</Text>
          <Text>Bottoms Up Time: {results} Minutes</Text>
        </View>
      )}
    </View>
  )
}

export default BottomsUpCalculator
