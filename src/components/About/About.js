import { TouchableOpacity ,Image,View, Text ,StyleSheet } from 'react-native'
import React from 'react'
   const About = () => {
 
  
    return (
      <View style={styles.container}>
        <View style={styles.row}>
    <View style={styles.column}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.paragraph}>
      We moved to Israel from Brazil in 2016. It was a huge step in our lives. We always thought about living in Israel but having a family and a business back there made it hard to do it.
           Everything changed in 2014. Our daughter was living in Israel for one year in a Jewish youth program and we came to visit her. We found out that our connection to this country was even greater than we thought and we started thinking seriously about coming.
       
      </Text>
     
    </View>
    <View style={styles.column}>
      <Image
        source={require('../../../assets/bg1.png')}  
        style={styles.image}
      />
    </View>
  </View>
</View>
);
};

const styles = StyleSheet.create({
      container: {
      padding: 50,
      height:800,
      },
      row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      },
      column: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
      },
      heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',  
      },
      paragraph: {
      marginBottom: 10,
      },
      
      image: {
      height: 600,
      width: 600,
      },
      });

export default About