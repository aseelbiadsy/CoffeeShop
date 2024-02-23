import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet ,TouchableOpacity } from "react-native";
import Colors from "../constans/Colors/Colors";
import { Link , useLocation } from "react-router-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constans/Urls/Url";
 
const AppBar = ({ userId, onLogout }) => {

  console.log("user : " + user);
  console.log("user Id : " + userId);

  const location=useLocation();
  const [logout , setLogout] = useState(0);
  const [user, setUser] = useState({});

  useFonts({
    W2: require("../../assets/Fonts/Tajawal-Bold.ttf"),
  });

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        console.log("Fetching user by id:", userId);
        const response = await axios.get(`${BASE_URL}/users?_id=${userId}`);

        console.log("User Data:", response);

        if (response?.status === 200 && response.data.length > 0) {
          const fetchedUser = response.data;
          const u1 = fetchedUser.find((user) => user._id === userId);
          setUser(u1);
          console.log("User:", u1);
        } else {
          console.error("Error fetching user details:", response?.data);
        }
      } catch (error) {
        console.error("Error during request:", error);
      }
    };

     fetchUserById();
  }, [userId]);


  const handleLogout = () => {
    onLogout(null);
    setUser({});
    console.log("User logged out");
    setLogout(1);
     
  };

  return (
    <View style={styles.container}>
      <Link to="/">
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Link>

      <View style={styles.navLinks}>
        <Link to="/Home" style={styles.link}>
          <Text
            style={[
              styles.linkText,
              location.pathname === "/Home" && styles.activeLink,
            ]}
          >
            HOME
          </Text>
        </Link>
        <Link
          to="/CategoryScreen"
          style={[
            styles.link,
            location.pathname === "/CategoryScreen" && styles.activeLink,
          ]}
        >
          <Text style={styles.linkText}>CATEGORY</Text>
        </Link>
        <Link
          to="/About"
          style={[
            styles.link,
            location.pathname === "/About" && styles.activeLink,
          ]}
        >
          <Text style={styles.linkText}>ABOUT</Text>
        </Link>
      </View>

      <View style={styles.linksContainer}>
        {user  ? (
          <>
          <Text style={styles.name}>Hello {user?.name || 'User'} ,</Text>
          {logout === 0 ? (
            <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          ):(
            <>
           <Link to="/login">
          <FontAwesome
            style={styles.icon}
            name="user-o"
            size={30}
            color={Colors.Icon}
          />
        </Link>
        </>
          )}
            </>
          
        ) : (
        <>
          <Text style={styles.name}>Hello User,</Text>
          <Link to="/login">
          <FontAwesome
            style={styles.icon}
            name="user-o"
            size={30}
            color={Colors.Icon}
          />
        </Link>
        </>
        )}
       
        <Link to="/ShoppingCart">
          <FontAwesome
            style={styles.icon}
            name="shopping-cart"
            size={30}
            color={Colors.Icon}
          />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.NavBar,
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 70,
  },
  navLinks: {
    flexDirection: "row",
  },
  link: {
    marginRight: 20,
    fontFamily: "w2",
  },
  linkText: {
    fontSize: 18,
    color: Colors.Icon,
  },
  name: {
    fontSize: 18,
    color: Colors.Icon,
    fontFamily: "w2",
    marginRight: 25,
  },
  linksContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 16,
  },
  activeLink: {
    borderColor: Colors.Icon,
    borderBottomWidth: 4,
    paddingBottom: 9,
  }, logoutText: {
    fontSize: 18,
    color: Colors.Icon,
    fontFamily: 'w2',
    marginLeft: 5,
    marginRight:10,
  },
});

export default AppBar;
