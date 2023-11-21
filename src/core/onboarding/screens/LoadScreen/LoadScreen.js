import React, { useCallback, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import deviceStorage from '../../utils/AuthDeviceStorage'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/auth'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'

const LoadScreen = () => {
  const navigation = useNavigation()

  const dispatch = useDispatch()
  const authManager = useAuth()

  const { config } = useOnboardingConfig()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  useFocusEffect(
    useCallback(() => {
      setAppState()
    }, []),
  )

  const setAppState = async () => {
    const shouldShowOnboardingFlow =
      await deviceStorage.getShouldShowOnboardingFlow()
    if (!shouldShowOnboardingFlow) {
      if (config?.isDelayedLoginEnabled) {
        await fetchPersistedUserIfNeeded()
        return
      }
      navigation.navigate('LoginStack', { screen: 'Welcome' })
    } else {
      navigation.navigate('Walkthrough')
    }
  }

  const fetchPersistedUserIfNeeded = async () => {
    if (!authManager?.retrievePersistedAuthUser) {
      return navigation.navigate('Welcome')
    }
    authManager
      ?.retrievePersistedAuthUser(config)
      .then(response => {
        if (response?.user) {
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
          Keyboard.dismiss()
        }
        navigation.navigate('Welcome')
      })
      .catch(error => {
        console.log(error)
        navigation.navigate('Welcome')
        // DelayedHome
      })
  }
  return <View />
}

export default LoadScreen