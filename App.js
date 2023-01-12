import { View } from "react-native";
import { useFonts } from 'expo-font';
import React, { useCallback, useMemo, useRef } from 'react';
import MapActivity from "./activities/MapActivity";
import { app } from "./firebase/config";
import { ref, onValue, getDatabase, set } from "firebase/database"
export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <SplashScreen />
    )
  }
 
  return (
   <MapActivity/>
  );
}

const SplashScreen = () => {
  return <View></View>
}