import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import BackgroundService from 'react-native-background-actions';



const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    //linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};



const LOCATION_TRACKING = 'location-tracking';

var l1;
var l2;

function UserLocation() {

    const [locationStarted, setLocationStarted] = React.useState(false);


    React.useEffect(() => {
        const config = async () => {
            let resf = await Location.requestForegroundPermissionsAsync();
            let resb = await Location.requestBackgroundPermissionsAsync();
            if (resf.status != 'granted' && resb.status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                console.log('Permission to access location granted');
            }
        };
        config();
    }, []);

  

    return (
        <View>
          {locationStarted ?
              <TouchableOpacity onPress={stopLocation}>
                  <Text style={styles.btnText}>Stop Tracking</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={startLocation}>
                  <Text style={styles.btnText}>Start Tracking</Text>
              </TouchableOpacity>
          }
        </View>
    );
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 20,
        backgroundColor: 'green',
        color: 'white',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});



export default UserLocation;