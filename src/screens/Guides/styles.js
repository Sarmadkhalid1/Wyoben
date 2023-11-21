import { StyleSheet, StatusBar } from 'react-native'
import { colors, screenHeight, screenWidth } from '../../assets'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    buttonImage: {
      width: (screenHeight * 28) / 1000,
      height: (screenHeight * 28) / 1000,
      tintColor: '#E0E0E0',
      // fontWeight:'900',
    },
    item: {
      width: screenWidth,
      height: (screenHeight * 75) / 1000,
      padding: (screenHeight * 22) / 1000,
      borderBottomWidth: 0.7, // Add a border line at the bottom
      borderBottomColor: '#ccc', // Border color,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'space-around',
    },
  })
}

export default dynamicStyles
