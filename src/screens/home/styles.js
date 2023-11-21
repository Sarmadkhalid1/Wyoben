import { StyleSheet, StatusBar } from 'react-native'
import { screenHeight, screenWidth } from '../../assets'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      // alignContent: 'center',
      alignItems: 'center',
    },
    screen_title: {
      color: '#979797',
      marginTop: (screenHeight * 95) / 1000,
      fontSize: (screenHeight * 28) / 1000,
      fontWeight: '400',
    },
    calculate_filter: {
      flexDirection: 'row',
      width: screenWidth * 0.6,
      height: (screenHeight * 29) / 1000,
      borderRadius: 100,
      backgroundColor: '#E0E0E0',
      marginTop: screenHeight * 0.01,
    },
    sub_view1: {
      marginLeft: screenWidth * 0.01,
      width: screenWidth * 0.29,
      height: (screenHeight * 25) / 1000,
      borderRadius: 100,
    },
    sub_view2: {
      width: screenWidth * 0.29,
      height: (screenHeight * 25) / 1000,
      borderRadius: 100,
    },
    image: {
      height: (screenHeight * 198) / 1000,
      width: screenWidth,
    },

    item: {
      width: screenWidth,
      height: (screenHeight * 75) / 1000,
      padding: (screenHeight * 22) / 1000,
      borderBottomWidth: 0.7, // Add a border line at the bottom
      borderBottomColor: '#ccc', // Border color,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    },
    buttonImage: {
      width: (screenHeight * 28) / 1000,
      height: (screenHeight * 28) / 1000,
      tintColor: '#E0E0E0',
      // fontWeight:'900'
    },
  })
}

export default dynamicStyles
