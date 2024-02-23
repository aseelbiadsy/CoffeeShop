import { View, Text, StyleSheet } from 'react-native';
import React from 'react'
import Home from './home/Home'
import CategoryScreen from './Categories/CategoryScreen'
import About from './About/About'
import Footer from './Footer/Footer'
import { ScrollView } from 'react-native-web';
 

const Logo = () => {
   
 
  return (

   <ScrollView showsVerticalScrollIndicator={false}   >

      <View style={styles.container}>
      
      <View style={styles.Section}>
       <Home/>
      </View>
  
      <View style={styles.Section}>
        <CategoryScreen/>
       </View>
  
      <View style={styles.Section}>
        <About/>
      </View>
  
      <View style={styles.Section}>
        <Footer/>
      </View>
    </View>
   </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
     },
     Section: {
      marginBottom: 20,
      marginTop:20,
     },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
     },
    
     
    mainText: {
      fontSize: 20,
     },
    
    footerText: {
      fontSize: 16,
      color: 'gray',
     },
  });

export default Logo