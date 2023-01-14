import { View, AppRegistry } from "react-native";
import { useFonts } from 'expo-font';
import React, { useCallback, useMemo, useRef } from 'react';
import MapActivity from "./activities/MapActivity";
import { app } from "./firebase/config";
import { name as appName } from './app.json';
import { ref, onValue, getDatabase, set } from "firebase/database"
import * as TaskManager from 'expo-task-manager'
const TASK_FETCH_LOCATION = 'background-location-task';
   // 1 define the task passing its name and a callback that will be called whenever the location changes
   TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    const [location] = locations;
  console.log('app.js', location)
    try {
     
    } catch (err) {
      console.error(err);
    }
  });
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

AppRegistry.registerComponent(appName, () => App);