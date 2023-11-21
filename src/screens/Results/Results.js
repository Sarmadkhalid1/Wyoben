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
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useTheme, useTranslations, TouchableIcon } from '../../core/dopebase'
import dynamicStyles from './styles'
import { useCurrentUser } from '../../core/onboarding'
import { useAuth } from '../../core/onboarding/hooks/useAuth'
import { colors, icons, images, screenHeight, screenWidth } from '../../assets'
import Right from 'react-native-vector-icons/FontAwesome'
import { Header } from '../../components/Header'

// import home_show_case from '../../assets'

export const Results = memo(props => {
  const { navigation } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const data = [
    { id: '1', title: 'About Us' },
    { id: '2', title: 'Contact Us' },
    { id: '3', title: 'Terms of Use' },
  ]

  const renderItem = ({ item }) => (
    <TouchableOpacity
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
          flex: 0.5,
        }}>
        {item.title}
      </Text>
      <Image source={icons['right-arrow']} style={styles.buttonImage} />
    </TouchableOpacity>
  )

  const rowsPadding = 5

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F8F8F8',
          width: screenWidth,
          marginBottom: screenHeight * 0.1,
        }}>
        <Header
          title={'Results'}
          height={(screenHeight * 100) / 1000}
          width={screenWidth}
          paddingHorizontal={screenWidth * 0.02}
          showRightIcon={true}
          leftIconSource={icons.back}
          onBackPress={() => navigation.goBack()}
          rightIconSource={icons.info}
          tintColor={'#030104'}
        />
        <View style={[styles.table]}>
          <View style={[styles.tableRow, {}]}>
            <Text
              style={[
                styles.tableCell,
                styles.headerCell,
                { marginLeft: screenWidth * 0.1 },
              ]}>
              Result
            </Text>
          </View>
          <View style={{ borderBottomWidth: 5, borderBottomColor: '#E0E0E0' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ padding: rowsPadding, marginLeft: screenWidth * 0.1 }}>
                Volume in Cu. Ft.: 110.6
              </Text>
              <Text
                style={{ padding: rowsPadding, marginLeft: screenWidth * 0.1 }}>
                Gallons: 826.9
              </Text>
            </View>
            <Text
              style={{ padding: rowsPadding, marginLeft: screenWidth * 0.1 }}>
              Liters: 3142
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, { borderBottomWidth: 0.5 }]}>
            <Text
              style={{
                padding: rowsPadding,
                borderRightWidth: 0.5,
                width: screenWidth * 0.7,
              }}>
              Average number of bags necessary for the hole
            </Text>
            <Text style={{ padding: rowsPadding, width: screenWidth * 0.25 }}>
              Bags
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: 'black',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  padding: rowsPadding,
                  borderRightWidth: 0.5,
                  width: screenWidth * 0.35,
                }}>
                Dry Applications
              </Text>
              <View
                style={{ borderRightWidth: 0.5, width: screenWidth * 0.35 }}>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Enviroplug Medium:
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Enviroplug Coarse:
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Enviroplug #8(Recommended For Dry Holes Only)
                </Text>
              </View>
            </View>
            <View style={{ width: screenWidth * 0.25 }}>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                150
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                150
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                150
              </Text>
              <Text style={{ padding: rowsPadding }}></Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View
            style={{
              borderBottomColor: 'black',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  padding: rowsPadding,
                  borderRightWidth: 0.5,
                  width: screenWidth * 0.35,
                }}>
                Slurry Applications, See individual product sheet
              </Text>
              <View
                style={{ borderRightWidth: 0.5, width: screenWidth * 0.35 }}>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Enviroplug #16 & 20 @ 17% Solids:
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Enviroplug Grout @ 30% solids
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Grout-Well 'DF' @ 20% solids
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Grout-Well @ 17% solids
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Grout-Well @ 17% solids
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  TD-16 @ 17% solids
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Them-X Grout @ .93*
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Them-X Grout @ 1.05*
                </Text>
                <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                  Them-X Grout Plus*
                </Text>
              </View>
            </View>
            <View style={{ width: screenWidth * 0.25 }}>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                N/A
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                49
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                31
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                27
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                27
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                N/A
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                N/A
              </Text>
              <Text style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}>
                N/A
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.share,
          {
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.secondary,
            position: 'absolute',
            bottom: screenHeight * 0.03,
          },
        ]}>
        <Text
          style={{
            color: '#666666',
            fontSize: (screenHeight * 20) / 1000,
            fontWeight: '500',
          }}>
          Share
        </Text>
      </TouchableOpacity>
    </>
  )
})
