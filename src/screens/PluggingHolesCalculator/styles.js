import { StyleSheet, StatusBar } from 'react-native'
import { colors, screenHeight, screenWidth } from '../../assets'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      // alignContent: 'center',
      alignItems: 'center',
    },
    top_title: {
      width: screenWidth * 0.9,
      height: (screenHeight * 60) / 1000,
      borderRadius: 100,
      backgroundColor: '#E0E0E0',
      marginTop: screenHeight * 0.08,
    },
    sub_view1: {
      width: screenWidth * 0.9,
      borderRadius: 100,
    },
    filter: {
      width: screenWidth * 0.9,
      height: (screenHeight * 65) / 1000,
      // marginTop: screenHeight * 0.08,
      justifyContent: 'space-between',
    },
    hole_diameter: {
      width: screenWidth * 0.6,
      height: (screenHeight * 65) / 1000,
      borderRadius: 20,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    metric1: {
      width: screenWidth * 0.25,
      height: (screenHeight * 65) / 1000,
      borderRadius: 20,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: colors.primary,
    },
  })
}

export default dynamicStyles
