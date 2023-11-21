import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  useTheme,
  useTranslations,
  TouchableIcon,
  DopebaseContext,
} from '../../core/dopebase'
import dynamicStyles from '../home/styles'
import { useCurrentUser } from '../../core/onboarding'
import { useAuth } from '../../core/onboarding/hooks/useAuth'
import { colors, icons, images, screenHeight, screenWidth } from '../../assets'
import Right from 'react-native-vector-icons/FontAwesome'
import { Header } from '../../components/Header'

// import home_show_case from '../../assets'
const AnnularVelocityCalculator = memo(props => {
  const { navigation } = props
  const currentUser = useCurrentUser()
  const authManager = useAuth()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [filterType, setFilterType] = useState('Metric')
  const data = [
    {
      id: '1',
      title: 'Air',
      navigate_to: 'AnnularVelocityCalculatorAir',
    },
    {
      id: '2',
      title: 'Fluid',
      navigate_to: 'AnnularVelocityCalculatorFluid',
    },
  ]

  // useLayoutEffect(() => {
  //   const colorSet = theme.colors[appearance]

  //   navigation.setOptions({
  //     headerTitle: localized('Home'),
  //     headerRight: () => (
  //       <View>
  //         <TouchableIcon
  //           imageStyle={{ tintColor: colorSet.primaryForeground }}
  //           iconSource={theme.icons.logout}
  //           onPress={onLogout}
  //         />
  //       </View>
  //     ),
  //     headerStyle: {
  //       backgroundColor: colorSet.primaryBackground,
  //       borderBottomColor: colorSet.hairline,
  //     },
  //     headerTintColor: colorSet.primaryText,
  //   })
  // }, [])

  // useEffect(() => {
  //   if (!currentUser?.id) {
  //     return
  //   }
  // }, [currentUser?.id])

  // const onLogout = useCallback(() => {
  //   console.log('logout pressed')
  //   authManager?.logout(currentUser)
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: 'LoadScreen',
  //       },
  //     ],
  //   })
  // }, [currentUser])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => item.navigate_to && navigation.navigate(item.navigate_to)}
      activeOpacity={0.5}
      style={[
        styles.item,
        { backgroundColor: '#FFFFFF', flexDirection: 'row' },
      ]}>
      <Text
        style={{
          color: '#666666',
          fontSize: (screenHeight * 17) / 1000,
          fontWeight: '500',
          flex: 1,
        }}>
        {item.title}
      </Text>
      <Image source={icons['right-arrow']} style={styles.buttonImage} />
    </TouchableOpacity>
  )

  return (
    <>
      <View style={[styles.container, { backgroundColor: '#F8F8F8' }]}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <FastImage style={[styles.image]} source={images.home_show_case} />

        <Text style={styles.screen_title}>{`calculate with`}</Text>

        <View
          style={[
            styles.calculate_filter,
            {
              alignItems: 'center',
              paddingVertical: screenHeight * 0.017,
              backgroundColor: '#E0E0E0',
            },
          ]}>
          <TouchableOpacity
            onPress={() => setFilterType('Metric')}
            style={[
              styles.sub_view1,
              {
                alignItems: 'center',
                backgroundColor:
                  filterType === 'Metric' ? '#008C00' : '#E0E0E0',
              },
            ]}>
            <Text
              style={{
                color: filterType === 'Metric' ? '#FFFFFF' : '#666666',
                fontSize: (screenHeight * 15) / 1000,
                fontWeight: '500',
              }}>
              Metric
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilterType('Imperial')}
            style={[
              styles.sub_view2,
              {
                alignItems: 'center',
                backgroundColor:
                  filterType === 'Imperial' ? '#008C00' : '#E0E0E0',
              },
            ]}>
            <Text
              style={{
                color: filterType === 'Imperial' ? '#FFFFFF' : '#666666',
                fontSize: (screenHeight * 15) / 1000,
                fontWeight: '500',
              }}>
              Imperial
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ marginTop: (screenHeight * 100) / 1000 }}
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  )
})

export default AnnularVelocityCalculator