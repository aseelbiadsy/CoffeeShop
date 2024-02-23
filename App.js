import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeRouter as Router, Routes, Route } from 'react-router-native';

import Home from './src/components/home/Home';
import AppBar from './src/components/AppBar';
 import ShoppingCart from './src/components/Cart/ShoppingCart';
import Logo from './src/components/Logo';
 import About from './src/components/About/About';
import CategoryScreen from './src/components/Categories/CategoryScreen';
import Details from './src/components/Categories/Details';
import LoginScreen from './src/components/LoginOut/LoginScreen';
import RegisterScreen from './src/components/LoginOut/RegisterScreen';
import Footer from './src/components/Footer/Footer';
 import { useState } from 'react';
 import CheckOut from './src/components/CheckOut';

const App = (  ) => {
  
  const [userId, setUserId] = useState(null);
  const [logout, setLogout] = useState(false); 

  const handleLogin = (loggedInUserId) => {
    setUserId(loggedInUserId);
    setLogout(false); 
  };

  const handleRegister = (loggedInUserId) => {
    setUserId(loggedInUserId);
    setLogout(false);  
  };

  const handleLogout = () => {
    setUserId(null);
    setLogout(true); 
  };
  return (
    <SafeAreaView style={styles.container}>
      <Router>
         <AppBar userId={userId} onLogout={handleLogout}  />  
          <Routes>
          
          <Route path="/" element={<Logo />} />   {/* all pages */}

          <Route path="/login" element={<LoginScreen onLogin={handleLogin}/>  } />
          <Route path="login/Register" element={<RegisterScreen onRegister={handleRegister} />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/CategoryScreen" element={<CategoryScreen />} />
          <Route path="/About" element={<About />} />

          <Route path={`/Details/:encodedSubCategory`} element={<Details userId={userId}  />}   />
           <Route path="/ShoppingCart" element={<ShoppingCart userId={userId}  logout={logout}/>} /> 
            <Route path={`/CheckOut/:cart`} element={<CheckOut  userId={userId} />} />

          <Route path='/Footer' element={<Footer />} />
          </Routes>
      </Router>       
    </SafeAreaView>
  );
};

const styles =StyleSheet.create({  
  container: {
    flex: 1,
     },
});

export default App;

 