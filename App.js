// import React, { useEffect } from 'react'
// import { LogBox } from 'react-native'
// import { Provider } from 'react-redux'
// import SplashScreen from 'react-native-splash-screen'
// import { MenuProvider } from 'react-native-popup-menu'
// import {
//   DopebaseProvider,
//   extendTheme,
//   TranslationProvider,
//   ActionSheetProvider,
// } from './src/core/dopebase'
// import configureStore from './src/redux/store'
// import AppContent from './src/AppContent'
// import translations from './src/translations/'
// import { ConfigProvider } from './src/config'
// import { AuthProvider } from './src/core/onboarding/hooks/useAuth'
// import { authManager } from './src/core/onboarding/api'
// import InstamobileTheme from './src/theme'

// const store = configureStore()

// const App = () => {
//   const theme = extendTheme(InstamobileTheme)

//   useEffect(() => {
//     SplashScreen.hide()
//     LogBox.ignoreAllLogs(true)
//   }, [])
//   return (
//     <Provider store={store}>
//       <TranslationProvider translations={translations}>
//         <DopebaseProvider theme={theme}>
//           <ConfigProvider>
//             <AuthProvider authManager={authManager}>
//               <MenuProvider>
//                 <ActionSheetProvider>
//                   <AppContent />
//                 </ActionSheetProvider>
//               </MenuProvider>
//             </AuthProvider>
//           </ConfigProvider>
//         </DopebaseProvider>
//       </TranslationProvider>
//     </Provider>
//   )
// }

// export default App

// import PanoramaView from '@lightbase/react-native-panorama-view'
import { Dimensions, View } from 'react-native'
import { StyleSheet } from 'react-native'

const PanoramaDetails = () => (
  <View style={styles.container}>
    {/* <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 230, width: Dimensions.get('window').width }}
      inputType="mono"
      imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
    /> */}
  </View>
)

export default PanoramaDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: 230,
  },
})
