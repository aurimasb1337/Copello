import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { Avatar, Button, Card } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import { Icon } from '@rneui/themed';
import { Divider } from '@rneui/themed';
const PoliceItem = (props) => {
  
    const {index, data} = props
   return (
        <LinearGradient colors={['#4434ba', '#1e61e8']}  style={{
            shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginLeft:20,
        marginRight:20,
        borderRadius:20,
     
        height:'100%'
        }}>
                        
                <View style={{padding:20, flexDirection: 'column', flex:1}}>
                     
           <View style={{ flexDirection: 'row',   flexWrap: "wrap", justifyContent:'space-between', paddingBottom:10}}>
           <Text style={{
                    fontFamily:'Montserrat-SemiBold',
                    color: '#e3e8e5',
                    fontSize:16
                }}>🕘 {data[index]?.startingTime.slice(5)}</Text>

<Text style={{
                     fontFamily:'Montserrat-SemiBold',
                    color: '#e3e8e5',
                    fontSize:16
                }}>👉 {parseFloat(data[index]?.distance).toFixed(2) +' km'}</Text>
           </View>
           <Divider width={1} color={'#dee3e0'} />

           <Text style={{textAlign: 'center', marginTop:20}}>ℹ️</Text>
           <Text style={{textAlign: 'center', marginTop:5,  fontFamily:'Montserrat-Regular',   fontSize:18,
                    color: 'white'}}>{
                        data[index]?.address  
}
{
    data[index]?.details && `| ${data[index]?.details}`
}
</Text>

{/* <View style={{justifyContent: 'center', marginBottom:20, height:'80%'}}>
    <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:10, }}>
        <View style={{backgroundColor:'#36b38d', width:'30%', textAlign: 'center' , borderRadius:20,}}>
        <Text style={{
            fontFamily:'Montserrat-Bold', 
            color: 'white', textAlign: 'center', padding: 10
        }}>👍 {data[index]?.positiveVotes  }</Text>
        </View>

        <View style={{backgroundColor:'#b33642', width:'30%', textAlign: 'center', borderRadius:20,}}>
        <Text style={{
            fontFamily:'Montserrat-Bold', 
            color: 'white', textAlign: 'center', padding: 10
        }}>👎 {data[index]?.negativeVotes  }</Text>
        </View>
    </View>
</View> */}
                </View>

            
    
      </LinearGradient>
    )
}
function AnimatedCarousel({data, setActiveLoc}) {
 
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1, padding:20 }}>
            <Carousel
                loop
                width={width}
                height={width / 1.5}
                autoPlay={false}
                data={data}
                scrollAnimationDuration={1000}
           
                parallaxScrollingScale={0.9}
                mode="parallax"
                onSnapToItem={(index) => setActiveLoc({
                    latitude: data[index]?.latitude,
                    longitude: data[index]?.longitude
                })}
                renderItem={({ index }) =>{
               
                    return  (
                
                        <PoliceItem index={index} data={data}/>
                     
                 
                )}
            }
                parallaxScrollingOffset={50}
            />
        </View>
    );
}

export default AnimatedCarousel;