import { View, Text ,SafeAreaView , StyleSheet , Image,  KeyboardAvoidingView,TextInput, Pressable, Alert,} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import {MaterialIcons} from '@expo/vector-icons'
import { AntDesign } from "@expo/vector-icons";
import {useNavigate} from 'react-router-native';
import axios from 'axios'
import Logo from '../../../assets/logo.png'
import { BASE_URL } from '../../constans/Urls/Url';
import Colors from '../../constans/Colors/Colors';

 const LoginScreen = ({ onLogin }) => {

     const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
      if (email && password) {
        try {
          const response = await axios.get(`${BASE_URL}/users?email=${email}`);
    
          console.log('Response:', response.data);
          if (response.status === 200) {
            const userData = response.data;
    
            if (userData && userData.length > 0) {
              const userWithEmail = userData.find((user) => user.email === email && user.password===password);
    
              if (userWithEmail) {
                const { _id: userId } = userWithEmail;
            
                 console.log('Login successful', userWithEmail);
                alert('Login successful');
    
                if (userId) {
                  onLogin(userId);
                   navigate('/');
                }
                setEmail('');
                setPassword('');
              } else {
               // console.log('Email not found in the array');
                alert('Email or password is incorrect');
              }
            }
          } else {
            //console.log('User does not exist');
            alert('Invalid username or password');
          }
        } catch (error) {
          console.error('Error during login', error);
          Alert.alert('An error occurred during login');
        }
      } else {
         Alert.alert('Please enter both username and password');
      }
    };
  return (
    <SafeAreaView style={styles.container}>
       
       <View style={styles.imageContainer}>
        <Image source={ Logo } style={{  height:200 , width:250}} />
       </View>
       <KeyboardAvoidingView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
            Login to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                 fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                secureTextEntry={true}
               value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"gray"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ fontWeight: "500", color: "#007FFF" }}>
               
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 45 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigate("./Register")}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      alignItems: 'center',
     }, imageContainer:{
      marginTop:50,
   },textLogin:{
    fontSize:17,
    fontWeight:'bold',
     marginTop:20,
   },
  });
  
export default LoginScreen