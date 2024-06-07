import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherDetails from "./screens/WeatherDetails";

export default function App() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  
  function HomeScreen({ navigation }) {
    return (
      <>
        <View style={isPortrait ? styles.container : responsive.container}>
          <LinearGradient
            colors={["#1C2547", "#503F9D", "#8250AC"]}
            style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                style={isPortrait ? styles.homeImage : responsive.homeImage}
                source={require("./media/home-image2.png")}
              />
              <Text style={isPortrait ? styles.bigText1 : responsive.bigText1}>
                EarthSky
              </Text>
              <Text style={isPortrait ? styles.bigText2 : responsive.bigText2}>
                Weather
              </Text>
              <TouchableOpacity
                style={isPortrait ? styles.homeButton : responsive.homeButton}
                onPress={() => navigation.navigate("test")}>
                <Text
                  style={
                    isPortrait
                      ? styles.homeButtonText
                      : responsive.homeButtonText
                  }>
                  Get Weather
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </>
    );
  }
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather App">
        <Stack.Screen
          name="Go Back"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="test"
          options={{
            headerTintColor: "#fff",
            headerTitle: " ",
            headerTransparent: true,
            hideWhenScrolling: false,
            headerBlurEffect: "regular",
          }}>
          {() => <WeatherDetails />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const responsive = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  homeImage: {
    width: 150,
    height: 150,
  },
  bigText1: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
  },
  bigText2: {
    color: "#DDB130",
    fontSize: 34,
  },
  homeButton: {
    backgroundColor: "#DDB130",
    color: "white",
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 10,
    borderRadius: 50,
  },
  homeButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  homeImage: {
    width: 300,
    height: 300,
  },
  bigText1: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
  },
  bigText2: {
    color: "#DDB130",
    fontSize: 64,
  },
  homeButton: {
    backgroundColor: "#DDB130",
    color: "white",
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 10,
    borderRadius: 50,
  },
  homeButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
