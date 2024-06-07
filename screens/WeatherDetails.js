import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

function WeatherDetails() {
  const iconMapping = {
    "01d": require("../media/01d.png"),
    "01n": require("../media/01n.png"),
    "02d": require("../media/02d.png"),
    "02n": require("../media/02n.png"),
    "03d": require("../media/03d.png"),
    "03n": require("../media/03n.png"),
    "04d": require("../media/04d.png"),
    "04n": require("../media/04n.png"),
    "09d": require("../media/09d.png"),
    "09n": require("../media/09n.png"),
    "10d": require("../media/10d.png"),
    "10n": require("../media/10n.png"),
    "11d": require("../media/11d.png"),
    "11n": require("../media/11n.png"),
    "13d": require("../media/13d.png"),
    "13n": require("../media/13n.png"),
    "50d": require("../media/50d.png"),
    "50n": require("../media/50n.png"),
  };

  const [weather, setWeather] = useState(null);
  const [main, setMain] = useState(null);
  const [earthquakeData, setEarthquakeData] = useState(null);
  const [forecastList, setForecastList] = useState(null);
  const [city, setCity] = useState("");

  const API_KEY = "1392c03d425affb8ca5991acd43f1ef6";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      const mainData = response.data.main;
      setMain(mainData);
    } catch (error) {
      Alert.alert("Error", "City not found");
    }
  };

  const forecastWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const listData = response.data;
      setForecastList(listData);
    } catch (error) {
      Alert.Alert("Cant find the forecast");
    }
  };

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        const response = await axios.get(
          "https://earthquake.usgs.gov/fdsnws/event/1/query",
          {
            params: {
              format: "geojson",
              limit: 5,
              orderby: "time",
            },
          }
        );
        setEarthquakeData(response.data);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };

    fetchEarthquakeData();
  }, []);

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  
  return (
    <>
      <ScrollView style={isPortrait ? styles.ScrollView : landscape.ScrollView}>
        <View style={isPortrait ? styles.container : landscape.container}>
          <LinearGradient
            colors={["#5735b2", "#4d32a4", "#4b31a2", "#462f9a"]}
            locations={[0.07, 0.37, 0.61, 0.84]}
            style={
              isPortrait ? styles.linearGradient : landscape.linearGradient
            }>
            <View
              style={isPortrait ? styles.bigContainer : landscape.bigContainer}>
              <Text style={isPortrait ? styles.title : landscape.title}>
                Weather App
              </Text>
              <TextInput
                style={isPortrait ? styles.input : landscape.input}
                placeholder="Search for a place"
                placeholderTextColor="#EBEBF5"
                defaultValue={city}
                onChangeText={setCity}
              />

              <TouchableOpacity
                style={isPortrait ? styles.button : landscape.button}
                onPress={() => {
                  fetchWeather();
                  forecastWeather();
                }}>
                <Text
                  style={isPortrait ? styles.buttonText : landscape.buttonText}>
                  Get Weather
                </Text>
              </TouchableOpacity>
              {weather && main && (
                <View
                  style={
                    isPortrait
                      ? styles.weatherContainer
                      : landscape.weatherContainer
                  }>
                  <View style={isPortrait ? styles.left : landscape.left}>
                    <Text
                      style={
                        isPortrait
                          ? styles.weatherTempText
                          : landscape.weatherTempText
                      }>
                      {parseFloat(weather.main.temp).toFixed(0)}°
                    </Text>
                    <View>
                      <Text
                        style={
                          isPortrait
                            ? styles.weatherMaxLowText
                            : landscape.weatherMaxLowText
                        }>
                        H: {main.temp_max}° L: {main.temp_min}°
                      </Text>
                      <Text
                        style={
                          isPortrait
                            ? styles.weatherText
                            : landscape.weatherText
                        }>
                        {weather.name}, {weather.sys.country}{" "}
                      </Text>
                    </View>
                  </View>
                  <View style={isPortrait ? styles.right : landscape.right}>
                    <Image
                      source={iconMapping[weather.weather[0].icon]}
                      style={isPortrait ? styles.image : landscape.image}
                    />
                    <Text
                      style={
                        isPortrait ? styles.weatherText : landscape.weatherText
                      }>
                      {weather.weather[0].main}
                    </Text>
                  </View>
                </View>
              )}
              <View>
                {forecastList && forecastList.list && (
                  <>
                    <Text style={isPortrait ? styles.title : landscape.title}>
                      7-Day Forecast
                    </Text>

                    <ScrollView horizontal>
                      {forecastList.list.map((forecast, index) => (
                        <LinearGradient
                          key={index}
                          colors={["#1C2547", "#503F9D", "#8250AC"]}
                          style={
                            isPortrait
                              ? styles.forecastContainer
                              : landscape.forecastContainer
                          }>
                          <Text
                            style={
                              isPortrait
                                ? styles.forecastText
                                : landscape.forecastText
                            }>
                            {parseFloat(forecast.main.temp).toFixed(0)}°
                          </Text>

                          <Image
                            source={iconMapping[forecast.weather[0].icon]}
                            style={
                              isPortrait
                                ? styles.forecastImage
                                : landscape.forecastImage
                            }
                          />
                          <Text
                            style={
                              isPortrait
                                ? styles.forecastTempText
                                : landscape.forecastTempText
                            }>
                            {forecast.dt_txt.split(" ")[0]}
                          </Text>
                        </LinearGradient>
                      ))}
                    </ScrollView>
                  </>
                )}
              </View>
              <View>
                <Text style={isPortrait ? styles.title : landscape.title}>
                  Top 5 Most Recent Earthquakes
                </Text>
                {earthquakeData ? (
                  earthquakeData.features.map((earthquake, index) => (
                    <View
                      key={index}
                      style={
                        isPortrait
                          ? styles.earthquakeContainer
                          : landscape.earthquakeContainer
                      }>
                      <View style={isPortrait ? styles.left2 : landscape.left2}>
                        <Text
                          style={
                            isPortrait ? styles.magnitude : landscape.magnitude
                          }>
                          {parseFloat(earthquake.properties.mag).toFixed(1)}
                        </Text>
                      </View>
                      <View
                        style={isPortrait ? styles.right2 : landscape.right2}>
                        <Text style={isPortrait ? styles.name : landscape.name}>
                          {earthquake.properties.place}
                        </Text>
                        <Text
                          style={
                            isPortrait ? styles.location : landscape.location
                          }>
                          {earthquake.geometry.coordinates[1]},{" "}
                          {earthquake.geometry.coordinates[0]}
                        </Text>
                        <Text
                          style={isPortrait ? styles.depth : landscape.depth}>
                          {earthquake.geometry.coordinates[2]} km
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View
                    style={
                      isPortrait
                        ? styles.earthquakeContainerLoading
                        : landscape.earthquakeContainerLoading
                    }>
                    <Text
                      style={
                        isPortrait ? styles.loadingText : landscape.loadingText
                      }>
                      Loading earthquake data...
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "column",
    width: "50%",
    height: 170,
    alignItems: "left",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  right: {
    flex: 1,
    alignItems: "center",
  },
  bigContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginTop: 100,
    marginBottom: 25,
    color: "white",
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 40,
    color: "white",
    borderRadius: 12.38,
    marginBottom: 10,
    backgroundColor: "#2E335A",
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6444b9",
    padding: 10,
    borderRadius: 12.38,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  weatherContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6444b9",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  weatherText: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
  weatherTempText: {
    fontSize: 70,
    marginTop: 15,
    color: "white",
  },
  weatherMaxLowText: {
    fontSize: 12,
    color: "#afa2d9",
  },
  earthquakeContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#6444b9",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  earthquakeContainerLoading: {
    height: 600,
    width: "100%",
  },
  magnitude: {
    color: "white",
    fontSize: 24,
  },
  ScrollView: {
    flex: 1,
  },
  left2: {
    width: 50,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  right2: {
    width: "75%",
    height: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  name: {
    color: "white",
    fontSize: 16,
  },
  location: {
    color: "white",
  },
  depth: {
    color: "white",
  },
  forecastTempText: {
    color: "white",
  },
  forecastImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    marginTop: 10,
  },
  forecastContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 7,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  forecastText: {
    fontSize: 36,
    color: "white",
  },
  loadingText: {
    width: "100%",
    fontWeight: 700,
    color: "#ffff",
    fontSize: 24,
  },
});

const landscape = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "column",
    width: "50%",
    height: 170,
    alignItems: "left",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  right: {
    flex: 1,
    alignItems: "center",
  },
  bigContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginTop: 100,
    marginBottom: 25,
    color: "white",
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 40,
    color: "white",
    borderRadius: 12.38,
    marginBottom: 10,
    backgroundColor: "#2E335A",
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6444b9",
    padding: 10,
    borderRadius: 12.38,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  weatherContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6444b9",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  weatherText: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
  weatherTempText: {
    fontSize: 70,
    marginTop: 15,
    color: "white",
  },
  weatherMaxLowText: {
    fontSize: 12,
    color: "#afa2d9",
  },
  earthquakeContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#6444b9",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  earthquakeContainerLoading: {
    height: 600,
    width: "100%",
  },
  magnitude: {
    color: "white",
    fontSize: 34,
  },
  ScrollView: {
    flex: 1,
  },
  left2: {
    width: "50%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  right2: {
    width: "50%",
    height: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  name: {
    color: "white",
    fontSize: 16,
  },
  location: {
    color: "white",
  },
  depth: {
    color: "white",
  },
  forecastTempText: {
    color: "white",
  },
  forecastImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    marginTop: 10,
  },
  forecastContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 7,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  forecastText: {
    fontSize: 36,
    color: "white",
  },
  loadingText: {
    width: "100%",
    fontWeight: 700,
    color: "#ffff",
    fontSize: 24,
  },
  magText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default WeatherDetails;
