import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors'; 
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const apiKey = '27b38ed5bc6c40a4e6de0c7adeb3038f';
    const city = 'Delhi'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Information</Text>
      {weatherData ? (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>City: {weatherData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="thermometer-three-quarters" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>
              Temperature: {weatherData.main.temp}°C
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="wb-sunny" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>
              Condition: {weatherData.weather[0].description}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="opacity" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>
              Humidity: {weatherData.main.humidity}%
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="air" size={24} color={Colors.PRIMARY} />
            <Text style={styles.infoText}>
              Wind Speed: {weatherData.wind.speed} m/s
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.infoText}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-mid',
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    marginLeft: 10,
  },
  errorText: {
    color: Colors.ERROR,
  },
});


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import Colors from '../constants/Colors';
// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import Geolocation from '@react-native-community/geolocation'; 

// export default function Weather() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const apiKey = '27b38ed5bc6c40a4e6de0c7adeb3038f';

//     const fetchWeatherData = async (latitude, longitude) => {
//       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) throw new Error('Failed to fetch weather data');
//         const data = await response.json();
//         setWeatherData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Request location permission and fetch location
//     if (Geolocation) {
//       Geolocation.requestAuthorization();
//       Geolocation.getCurrentPosition(
//         position => {
//           fetchWeatherData(position.coords.latitude, position.coords.longitude);
//         },
//         error => {
//           setError('Failed to get location');
//           setLoading(false);
//           console.error(error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     } else {
//       setError('Geolocation is not available');
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color={Colors.PRIMARY} />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Weather Information</Text>
//       {weatherData ? (
//         <View style={styles.infoContainer}>
//           <View style={styles.infoRow}>
//             <FontAwesome name="map-marker" size={24} color={Colors.PRIMARY} />
//             <Text style={styles.infoText}>City: {weatherData.name}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <FontAwesome name="thermometer-three-quarters" size={24} color={Colors.PRIMARY} />
//             <Text style={styles.infoText}>
//               Temperature: {weatherData.main.temp}°C
//             </Text>
//           </View>
//           <View style={styles.infoRow}>
//             <MaterialIcons name="wb-sunny" size={24} color={Colors.PRIMARY} />
//             <Text style={styles.infoText}>
//               Condition: {weatherData.weather[0].description}
//             </Text>
//           </View>
//           <View style={styles.infoRow}>
//             <MaterialIcons name="opacity" size={24} color={Colors.PRIMARY} />
//             <Text style={styles.infoText}>
//               Humidity: {weatherData.main.humidity}%
//             </Text>
//           </View>
//           <View style={styles.infoRow}>
//             <MaterialIcons name="air" size={24} color={Colors.PRIMARY} />
//             <Text style={styles.infoText}>
//               Wind Speed: {weatherData.wind.speed} m/s
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <Text style={styles.infoText}>No data available</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.WHITE,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: 'outfit-mid',
//     color: Colors.PRIMARY,
//     marginBottom: 20,
//   },
//   infoContainer: {
//     width: '100%',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   infoText: {
//     fontSize: 18,
//     fontFamily: 'outfit',
//     color: Colors.GRAY,
//     marginLeft: 10,
//   },
//   errorText: {
//     color: Colors.ERROR,
//   },
// });
