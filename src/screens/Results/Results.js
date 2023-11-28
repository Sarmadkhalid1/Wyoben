import React, { memo, useContext, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, icons, screenHeight, screenWidth } from "../../assets";
import { Header } from "../../components/Header";
import { DopebaseContext, useTheme } from "../../core/dopebase";
import dynamicStyles from "./styles";
import { captureScreen } from "react-native-view-shot";
import Share from "react-native-share";

export const Results = memo((props) => {
  const context = useContext(DopebaseContext);
  const { navigation, route } = props;
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);
  console.log("Routes : ", route?.params?.results);
  const rowsPadding = 5;

  const viewRef = useRef();

  const captureAndShare = async () => {
    try {
      const uri = await captureScreen({
        format: "jpg",
        quality: 0.8,
        result: "tmpfile",
      });

      // Use the captured screenshot URI to share
      shareScreenshot(uri);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  const shareScreenshot = (uri) => {
    // Use the react-native-share library to share the screenshot
    Share.open({
      url: `file://${uri}`,
      type: "image/jpeg",
      failOnCancel: false,
    })
      .then((res) => console.log("Share success:", res))
      .catch((error) => console.error("Share error:", error));
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F8F8F8",
          width: screenWidth,
          marginBottom: screenHeight * 0.1,
        }}
      >
        <Header
          title={"Results"}
          height={(screenHeight * 100) / 1000}
          width={screenWidth}
          paddingHorizontal={screenWidth * 0.02}
          showRightIcon={true}
          leftIconSource={icons.back}
          onBackPress={() => navigation.goBack()}
          rightIconSource={icons.info}
          tintColor={"#030104"}
        />
        <View ref={viewRef}>
          {route?.params?.type === "PluggingHolesCalculator" ? (
            <View>
              <View style={[styles.table]}>
                <View style={[styles.tableRow, {}]}>
                  <Text
                    style={[
                      styles.tableCell,
                      styles.headerCell,
                      { marginLeft: screenWidth * 0.1 },
                    ]}
                  >
                    Result
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 5,
                    borderBottomColor: "#E0E0E0",
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ padding: rowsPadding }}>
                      Volume in Cu.
                      {context?.unit === "Imperial" ? "Ft." : "Meters"} :{""}
                      {route?.params?.results?.holeVolumeCubicMeter
                        ? route?.params?.results?.holeVolumeCubicMeter
                        : route?.params?.results?.holeVolumeCubicFt}
                    </Text>
                    <Text style={{ padding: rowsPadding }}>
                      {context?.unit === "Imperial" ? "Gallons:" : "Liters"}:
                      {Math.round(route?.params?.results?.holeVolume)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <View style={[styles.tableRow, { borderBottomWidth: 0.5 }]}>
                  <Text
                    style={{
                      padding: rowsPadding,
                      borderRightWidth: 0.5,
                      width: screenWidth * 0.7,
                    }}
                  >
                    Approximate number of bags necessary for the hole
                  </Text>
                  <Text
                    style={{ padding: rowsPadding, width: screenWidth * 0.25 }}
                  >
                    Bags
                  </Text>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      Dry Applications
                    </Text>
                    <View
                      style={{
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug Medium:
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug Coarse:
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug #8(Recommended For Dry Holes Only)
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: screenWidth * 0.25 }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        marginTop: -5,
                      }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 5.5)}
                    </Text>
                    <Text
                      style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 5.5)}
                    </Text>
                    <Text
                      style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 5.5)}
                    </Text>
                    {/* <Text style={{ padding: rowsPadding }}></Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <View
                  style={{
                    borderBottomColor: "black",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      Slurry Applications, See individual product sheet
                    </Text>
                    <View
                      style={{
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug #16 & 20 @ 17% Solids:
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug Grout @ 30% solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Grout-Well 'DF' @ 20% solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Grout-Well @ 17% solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        TD-16 @ 17% -- solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Them-X Grout @ .93*
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Them-X Grout @ 1.05*
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Them-X Grout Plus*
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: screenWidth * 0.25 }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        paddingTop: 20,
                        marginTop: 10,
                      }}
                    >
                      N/A
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 50,
                      }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 17)}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 50,
                      }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 27)}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 31)}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 50,
                      }}
                    >
                      {route?.params?.results?.holeVolumeGal &&
                        Math.round(route?.params?.results?.holeVolumeGal / 31)}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      N/A
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      N/A
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      N/A
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : route?.params?.type === "AnnularSpaceCalculator" ? (
            <View>
              <View style={[styles.table]}>
                <View style={[styles.tableRow, {}]}>
                  <Text
                    style={[
                      styles.tableCell,
                      styles.headerCell,
                      { marginLeft: screenWidth * 0.1 },
                    ]}
                  >
                    Result
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 5,
                    borderBottomColor: "#E0E0E0",
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Text style={{ padding: rowsPadding }}>
                      Volume in Cu.
                      {context?.unit === "Imperial" ? "Ft." : "Meters"} :{""}
                      {route?.params?.results?.annularVolumeCubicMeter
                        ? Math.round(
                            route?.params?.results?.annularVolumeCubicMeter
                          )
                        : Math.round(
                            route?.params?.results?.annularVolumeCubicFt
                          )}
                    </Text>
                    <Text style={{ padding: rowsPadding }}>
                      {context?.unit === "Imperial" ? "Gallons:" : "Liters"}:
                      {route?.params?.results?.annularVolume
                        ? Math.round(route?.params?.results?.annularVolume)
                        : Math.round(
                            route?.params?.results?.annularVolumeGallons
                          )}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <View style={[styles.tableRow, { borderBottomWidth: 0.5 }]}>
                  <Text
                    style={{
                      padding: rowsPadding,
                      borderRightWidth: 0.5,
                      width: screenWidth * 0.7,
                    }}
                  >
                    Approximate number of bags necessary for the hole
                  </Text>
                  <Text
                    style={{ padding: rowsPadding, width: screenWidth * 0.25 }}
                  >
                    Bags
                  </Text>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      Dry Applications
                    </Text>
                    <View
                      style={{
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug Medium:
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug Coarse:
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug #8(Recommended For Dry Holes Only)
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: screenWidth * 0.25 }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        marginTop: -5,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 5.5
                        )}
                    </Text>
                    <Text
                      style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                    >
                      N/A
                    </Text>
                    <Text
                      style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 5.5
                        )}
                    </Text>
                    {/* <Text style={{ padding: rowsPadding }}></Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.table}>
                <View
                  style={{
                    borderBottomColor: "black",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      Slurry Applications, See individual product sheet
                    </Text>
                    <View
                      style={{
                        borderRightWidth: 0.5,
                        width: screenWidth * 0.35,
                      }}
                    >
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug #16 & 20 @ 17% Solids:
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Enviroplug Grout @ 30% solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Grout-Well 'DF' @ 20% solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Grout-Well @ 17% solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        TD-16 @ 17% -- solids
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Them-X Grout @ .93*
                      </Text>
                      <Text
                        style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                      >
                        Them-X Grout @ 1.05*
                      </Text>
                      {/* <Text
                      style={{ padding: rowsPadding, borderBottomWidth: 0.5 }}
                    >
                      Them-X Grout Plus*
                    </Text> */}
                    </View>
                  </View>
                  <View style={{ width: screenWidth * 0.25 }}>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        paddingTop: 20,
                        marginTop: 10,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 31
                        )}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 50,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 17
                        )}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 50,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 27
                        )}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 31
                        )}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 50,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 31
                        )}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 29
                        )}
                    </Text>
                    <Text
                      style={{
                        padding: rowsPadding,
                        borderBottomWidth: 0.5,
                        height: 45,
                      }}
                    >
                      {route?.params?.results?.annularVolumeGallons &&
                        Math.round(
                          route?.params?.results?.annularVolumeGallons / 36
                        )}
                    </Text>
                    {/* <Text
                    style={{
                      padding: rowsPadding,
                      borderBottomWidth: 0.5,
                      height: 45,
                    }}
                  >
                    N/A
                  </Text> */}
                  </View>
                </View>
              </View>
            </View>
          ) : route?.params?.type === "DrillingFluidCalculator" ? (
            <View style={[styles.table]}>
              <View style={styles.drillinFluidRow}>
                <Text>Bore Diameter:</Text>
                <Text>{route?.params?.results?.boreDiameter} inches</Text>
              </View>
              <View style={styles.drillinFluidRow}>
                <Text>Bore Length:</Text>
                <Text>{route?.params?.results?.boreLength} feet</Text>
              </View>
              <View style={styles.drillinFluidRow}>
                <Text>Total Hole Volume:</Text>
                <Text>{route?.params?.results?.boreVolume} gals</Text>
              </View>
              <View style={styles.drillinFluidRow}>
                <Text>Soil Type Multiplier:</Text>
                <Text>{route?.params?.results?.multiplier}</Text>
              </View>
              <View style={styles.drillinFluidRow}>
                <Text>Recommended Pump Volume:</Text>
                <Text>{route?.params?.results?.recPumpVol} gals</Text>
              </View>
              <View style={styles.makeupResults}>
                {route?.params?.results?.makeupResults.map(
                  (resultLine, index) => (
                    <View key={index} style={{ padding: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Product(s) Amount per 100 gallons of make-up water
                      </Text>
                      <Text>{resultLine}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          ) : route?.params?.type === "AnnularVelocityCalculatorAir" ? (
            <View style={{ padding: 20, paddingTop: 0 }}>
              {route?.params?.results !== null && (
                <View style={styles.results}>
                  <Text style={styles.resultHeader}>Results:</Text>
                  <Text>{Math.round(route?.params?.results)} Ft / Min</Text>

                  {route?.params?.results < 3000 && (
                    <View style={styles.alert}>
                      <Text style={styles.alertIcon}>⚠️</Text>
                      <Text style={styles.alertText}>
                        Annular velocity is below recommended values for hole
                        cleaning. Minimum result value is 3000 feet / min.
                        Please adjust input value 1 to achieve a result greater
                        than 3000 feet / min.
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : route?.params?.type === "AnnularVelocityCalculatorFluid" ? (
            <View style={{ padding: 20, paddingTop: 0 }}>
              {route?.params?.results !== null && (
                <View style={styles.results}>
                  <Text style={styles.resultHeader}>Results:</Text>
                  <Text>{Math.round(route?.params?.results)} Ft / Min</Text>
                  {route?.params?.results < 50 && (
                    <View style={styles.alert}>
                      <Text style={styles.alertIcon}>⚠️</Text>
                      <Text style={styles.alertText}>
                        Annular velocity is below recommended values for hole
                        cleaning. Minimum result value is 50 feet / min. Please
                        adjust input value 1 to achieve a result greater than 50
                        feet / min.
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : route?.params?.type === "DrillingCalculator" ? (
            <View style={{ padding: 20, paddingTop: 0 }}>
              {route?.params?.results.map((result, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{result?.formation}:</Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "black" }}
                  >
                    {result?.result}
                  </Text>
                </View>
              ))}
            </View>
          ) : route?.params?.type === "FluidWeightUpCalculator" ? (
            <View style={[styles.table]}>
              {route?.params?.results && (
                <View>
                  {/* <Text style={styles.resultStyle}>Results</Text> */}
                  <View style={styles.drillinFluidRow}>
                    <Text> Barite Addition per Barrel:</Text>
                    <Text>{route?.params?.results?.baritePerBarrel}</Text>
                  </View>
                  <View style={styles.drillinFluidRow}>
                    <Text> Fluid Volume Increase:</Text>
                    <Text>{route?.params?.results?.volIncreaseInBarrels}</Text>
                  </View>
                  <View style={styles.drillinFluidRow}>
                    <Text> Barite Addition per 100bbls:</Text>
                    <Text>{route?.params?.results?.bariteAddPer100}</Text>
                  </View>
                  <View style={styles.drillinFluidRow}>
                    <Text> Fluid Volume Increase per 100bbls:</Text>
                    <Text>{route?.params?.results?.volIncPer100}</Text>
                  </View>
                </View>
              )}
            </View>
          ) : route?.params?.type === "BottomsUpCalculator" ? (
            <View style={{ padding: 20, paddingTop: 0 }}>
              {route?.params?.results && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Bottoms Up Time: </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "black" }}
                  >
                    {route?.params?.results} Minutes
                  </Text>
                </View>
              )}
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={captureAndShare}
        style={[
          styles.share,
          {
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.secondary,
            position: "absolute",
            bottom: screenHeight * 0.03,
          },
        ]}
      >
        <Text
          style={{
            color: "#666666",
            fontSize: (screenHeight * 20) / 1000,
            fontWeight: "500",
          }}
        >
          Share
        </Text>
      </TouchableOpacity>
    </>
  );
});
