import { View, Text, Image, StyleSheet ,TouchableOpacity, ScrollView} from 'react-native';
import React from 'react'
import Colors from '../../constans/Colors/Colors';
 import { useFonts } from "expo-font";
 import {useNavigate} from 'react-router-native';
import CategoryScreen from '../Categories/CategoryScreen';
import About from '../About/About';
import Footer from '../Footer/Footer';
 import { Animated } from 'react-native-web';
import './home.css'

 const Home = () => {
 
  useFonts({
     W2: require("../../../assets/Fonts/Tajawal-Bold.ttf"),
  });
 
  const navigate = useNavigate();

  const handlePress = () => {
   // console.log('Home');
    navigate("/CategoryScreen");
  };

  return (
      <   >
         <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.leftText}>Great Coffee</Text>
            <View style={[styles.txt, {marginLeft:7}]}>
          <div className='con'>
          <div className='txt1' >For Some Joy ...
            </div>  
          </div>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>View Menu ! </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <Image source={require('../../../assets/bg3.png')} style={styles.img}/>
        </View>
      </View>
      <View style={{margin:60}}>
       
      
      </View>
   </>
    )
}

const styles = StyleSheet.create({
  con1: {
    flex: 1,
    flexDirection :'column',
  },
  container: {
    flexDirection: 'row',
   },
  leftContainer: {
    flex: 1,
     alignItems: 'center',
     marginTop:160,
  },
  rightContainer: {
    flex: 1,
    marginRight: 60,
   },
  leftText: {
    fontSize: 70,
    color: Colors.Icon,
   fontFamily:"W2",
   justifyContent:'flex-start',

  },
  subtitle: {
    fontSize: 50,
    color: Colors.Icon,
    fontFamily:"W2",
    justifyContent:'flex-start',
  },
  button: {
    
    backgroundColor: Colors.Icon,
    borderRadius: 4,
   justifyContent:'flex-start',
   alignItems:'flex-start',
   padding:20,
   marginTop:20,
    },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 34,
    fontFamily:"W2",
  },img:{
    height:700,
    left:160,
    width:'100%',
     
  },txt:{ }
});

export default Home