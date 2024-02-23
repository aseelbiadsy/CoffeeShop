import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Image,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
   import axios from "axios";
  import Logo from '../../../assets/logo.png'
  import { BASE_URL } from '../../constans/Urls/Url';
  import Colors from '../../constans/Colors/Colors';
  import {useNavigate} from 'react-router-native';
 



  const RegisterScreen = ({onRegister}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();
 
  
    const handleRegister = async ( ) => {
      try {
        const user = { name, email, password };
        console.log("User:", user);
        const response = await axios.post(`${BASE_URL}/users`,user);
       // const saveUserResponse = await axios.post('http://localhost:3001/users', user);
              
        //console.log("saveUserResponse:", saveUserResponse)
        if (response?.status === 200 || response?.ok) {        
          const { _id: userId } = response?.data;
          alert(
            "Registration successful",
            "You have been registered successfully"
          );

          if (userId) {
            onRegister(userId);
            navigate('/');
            //navigate('/Logo',{ userId: userId } );
             //navigate(`/AppBar/${userId}`);
             
          }
          setName("");
          setEmail("");
          setPassword("");
        } else {
          console.error("Registration failed:", saveUserResponse?.data);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };
     
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.WHITE, alignItems: "center" }}
      >
        <View style={{ marginTop: 50 }}>
          <Image
            source={Logo}
            style={{ resizeMode: "contain", height: 100, width: 150 }}
          />
        </View>
  
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
              Register to Your Account
            </Text>
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={"gray"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="enter your Name"
              />
            </View>
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
                onBlur={() => {
                  if (!email.includes("@")) {
                    alert("Invalid Email", "Please enter a valid email address");
                  }
                }}
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
          </View>
  
          <View style={{ marginTop: 45 }} />
  
          <Pressable
             onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>
  
          <Pressable
            onPress={() =>  navigate("/Login")}
            style={{ marginTop: 10 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  