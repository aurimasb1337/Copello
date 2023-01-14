import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'





function ExpoLocation() {

   
    const TASK_FETCH_LOCATION = 'background-location-task';

 
    
   

    React.useEffect(() => {
     
         // 2 start the task
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
          notificationTitle: 'Using your location',
          notificationBody: 'To turn off, go back to the app and switch something off.',
        },
      });

    }, []);

  

    return (
        <View>
       
        </View>
    );
}




export default ExpoLocation;