import { View , AppState, NativeModules} from "react-native";
import MapView, {  Circle, Marker, MarkerAnimated, PROVIDER_GOOGLE  } from "react-native-maps";
import Svg, {Path, Ellipse, Image, SvgXml } from 'react-native-svg'
import {darkStyle} from '../styles/mapStyle';
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { getAuth, signInAnonymously } from "firebase/auth";
import { ref, get, getDatabase, set, child, onValue } from "firebase/database"
import { GestureHandlerRootView } from 'react-native-gesture-handler'; //-->add
import 'react-native-gesture-handler'
import AnimatedCarousel from '../carousel/AnimatedCarousel';
import * as Location from 'expo-location';
import ExpoLocation from "../services/ExpoLocation";
import UserLocation from "../services/UserLocation";




const initialCords = {
  latitude: 54.6858,
  longitude: 25.2877,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

const getDistance =  (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
  }
  else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
  }
}
export default function MapActivity() {

  const [tmplocs, setTmpLocs] = useState([])
const [locations, setLocations] = useState([])
const [location, setLocation] = useState(null);
const [activeLoc, setActiveLoc] = useState(null);

const bottomSheetRef = useRef(null);
const mapRef = useRef(null);

const snapPoints = useMemo(() => ['25%', '50%'], []);

useEffect(() => {
  const database = getDatabase()
  const dbRef = ref(database, `locations` )
  const auth = getAuth();
signInAnonymously(auth)

  onValue(dbRef, (snapshot) => {

    if(snapshot.exists()){

 
     const keys = Object.keys(snapshot.val())
     const payload = []
     keys.map((key) => payload.push(snapshot.val()[key]))
     setTmpLocs(payload)
    }
  
  } ) 



 
}, [])

useEffect(() => {
    if(locations && locations.length>0)
   {
    const payload = {
      ...initialCords,
      latitude: locations[0].latitude,
      longitude: locations[0].longitude
    }

    setActiveLoc(payload)
   }
  
}, [locations])


useEffect(() => {
  if(activeLoc)
 {
  const payload = {
    ...initialCords,
    ...activeLoc
  }

 
  mapRef.current.animateToRegion(payload, 1.3 * 1000);
 
 }

}, [activeLoc])

useEffect(() => {

   if(tmplocs && location){
   for(let loc of tmplocs) {

      loc.distance=getDistance(loc.latitude, loc.longitude, location.latitude, location.longitude, 'K')
     // console.log((loc.latitude + ' ' + loc.longitude) + 'and' + (location.coords.latitude + ' ' + location.coords.longitude) + 'distance is' + getDistance(loc.latitude, loc.longitude, location.coords.latitude, location.coords.longitude, 'K'))

    }
    const sortedDistanceArr = tmplocs.sort((a,b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))


    setLocations(sortedDistanceArr)
   }

}, [location,tmplocs] )




useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
                timeInterval: 5
    });
    setLocation(location.coords);

  })();
}, []);


const appState = useRef(AppState.currentState);
const [appStateVisible, setAppStateVisible] = useState(appState.current);
const [stateCount, setCount] = useState(0);
useEffect(() => {
  const subscription = AppState.addEventListener("change", nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      // onResume
      setCount(Math.random())
      //NativeModules.DevSettings.reload();
      if(locations && locations.length>0)
      {
       const payload = {
         ...initialCords,
         latitude: locations[0].latitude,
         longitude: locations[0].longitude
       }
   
      setActiveLoc(payload)
      }
   
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  
  });

  return () => {
    subscription.remove();
  };
}, []);
 

   const handleSheetChanges = useCallback((index) => {
  
   }, []);











  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
      
      }}
    >
      <UserLocation/>
   <ExpoLocation/>
      <MapView
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      showsUserLocation={true}
      followsUserLocation={false}
      showsMyLocationButton={true}
      initialRegion={{
       ...initialCords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={darkStyle}
        style={{
          width: "100%",
          height: "80%",
        }}
      >
       
        {
          locations.map((loc, key) => <Marker key={key}
          // title={loc.street}
          // description={loc.details}
     
          coordinate={{latitude:loc.latitude, longitude: loc.longitude}} 
          onPress={(marker) => setActiveLoc({...marker.nativeEvent.coordinate}) }
          icon={require('../cop.png')}
          >

      {/* <View style={{padding:50}} >
      <PulseAnimation color={'#34ebba'}  diameter={100} speed={1800} numPulses={2}  duration={3000} ></PulseAnimation>
      <Text style={{textAlign: 'center', marginTop: -5}}>👮</Text>
      </View> */}
          </Marker>
          )
        }




{/* {
          locations.map((loc, key) => <Marker key={key}
          // title={loc.street}
          // description={loc.details}
     
          coordinate={{latitude:loc.latitude, longitude: loc.longitude}} 
          onPress={(marker) => setActiveLoc({...marker.nativeEvent.coordinate}) }
          icon={require('../cop.png')}
          >
            
          </Marker>
          )
        } */}








        {/* {
          locations.map((loc, key) => <Circle
           key={key}
           center = {{latitude:loc.latitude, longitude: loc.longitude} }
           radius = { 150 }
           strokeWidth = { 1 }
           strokeColor = { '#0388fc' }
           fillColor = { 'rgba(189, 168, 245, 0.2)' }
           />
          )
        } */}
      </MapView>
     <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#162229'}}
        onChange={handleSheetChanges}
      >
   
          
        <View style={styles.contentContainer}>
       
        <AnimatedCarousel setActiveLoc={setActiveLoc} activeLoc={activeLoc} hook={stateCount} data={locations}/>

     
        </View>
      </BottomSheet>
    </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  contentContainer: {
 
    flex: 1,
    background: 'rgba(48,48,48,0.8155637254901961)',
    alignItems: 'center',
    
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
    position: 'absolute'
  },
  ring: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
    opacity: 1
  }
});

const rippleXml = `
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#78f8ff" stroke-width="20">
  <animate attributeName="r" repeatCount="indefinite" dur="2.0408163265306123s" values="0;30" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="2.0408163265306123s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
</circle><circle cx="50" cy="50" r="0" fill="none" stroke="#78f8ff" stroke-width="20">
  <animate attributeName="r" repeatCount="indefinite" dur="2.0408163265306123s" values="0;30" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-1.0204081632653061s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="2.0408163265306123s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-1.0204081632653061s"></animate>
</circle>
</svg>`
const RipplingDot = () => {
  return (
    
<SvgXml xml={rippleXml} width="100%" height="100%" />

  )
}