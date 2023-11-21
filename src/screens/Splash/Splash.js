import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,Image
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { screenHeight, screenWidth } from "../../assets";
// import FastImage from "react-native-fast-image";


const Splash = ({ navigation }) => {

//   React.useEffect(() => {
//     setTimeout(() => {
//         setTimeout(() => {
//           setTimeout(() => {
//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: 'BottomStack' }],
//               })
//             );
//           }, 1000);
//         }, 2000);
//       }, 0);
//   }, []);

  useLayoutEffect(()=>{
    setTimeout(() => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'BottomStack' }],
            })
          );
    }, 1500);
  },[])

  return (
    // <View style={styles.container}>
        <Image style={{height:screenHeight,width:screenWidth}} source={require('../../assets/images/Splash.png')} />     
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'center'
  },
//   logo: {
//     height: hp(20), width: wp(40), resizeMode: 'contain',
//   }
});
export default Splash;
