import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigators/RootNavigator'
import { OnboardingConfigProvider } from './core/onboarding/hooks/useOnboardingConfig'
import { useConfig } from './config'
import { Provider } from 'react-redux'
import { store } from './redux/store/index'
import { DopebaseProvider } from './core/dopebase'

export default AppContent = () => {
  const config = useConfig()

  return (
    <OnboardingConfigProvider config={config}>
      <DopebaseProvider>
        <Provider store={store}>
          <StatusBar />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </Provider>
      </DopebaseProvider>
    </OnboardingConfigProvider>
  )
}
