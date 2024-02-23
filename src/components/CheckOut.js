import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors  from '../constans/Colors/Colors';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constans/Urls/Url';
import {useNavigate} from 'react-router-native';

 const CheckOut = ({userId}) => {

  const navigate = useNavigate();
    const { cart } = useParams();
    const cartItems  = JSON.parse(decodeURIComponent(cart));

    console.log('cart',cartItems);

    const totalAmount = cartItems.reduce((acc, item) => {
        const itemTotal = item.pricePerUnit * item.quantity;
        return isNaN(itemTotal) ? acc : acc + itemTotal;
      }, 0);
      
      const [shippingAddress, setShippingAddress] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
     

    const submitOrder = async () => {
      if (!name || !phoneNumber || !shippingAddress) {
        alert('Please fill in all required fields.');
        console.error('Please fill in all required fields.');
        return;
      }
    
       const CheckoutOrder = {
        userId: userId,
        products: cartItems.map(item => ({
           name: item.nameDrink,
          quantity: item.quantity,
          price: item.pricePerUnit,
        })),
        totalAmount: totalAmount.toFixed(2),
        shippingAddress: shippingAddress,
        customer: {
          name,
          phoneNumber,
        },
      };
    
      console.log('Order:', CheckoutOrder);
    
      try {
        const response = await axios.post(`${BASE_URL}/Checkout`, CheckoutOrder);
        console.log('Response from server:', response.data);
        console.log('Order submitted successfully:', response.data);
        alert('Order submitted successfully.');
        localStorage.clear();
        navigate('/');
      } catch (error) {
        console.error('Error submitting order:', error);
    
         if (error.response) {
          console.log('Error response from server:', error.response.data);
        }
    
         if (error.request) {
          console.log('Request made but no response was received:', error.request);
        }
    
         console.log('Error config:', error.config);
      }
    };
    
      
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.title}>Pick up of your order and cash payment.</Text>
    
          {/* Display order summary */}
          <View style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>Order Summary:</Text>
            {cartItems.map(item => (
              <View key={item._id} style={styles.itemContainer}>
                <Text style={styles.item}>{item.nameDrink}</Text>
                <Text  style={styles.item}>{`X${item.quantity}`}</Text>
                
                <Text style={styles.item}>  {`Price: ₪${(item.pricePerUnit * item.quantity).toFixed(2)}`}</Text>
               </View>
            ))}
           <Text style={styles.totalText}>{`Total: ₪${totalAmount.toFixed(2)}`}</Text>
            </View>
    
           {/* Name input */}
      <View style={styles.inputContainer}>
         <TextInput
          style={styles.inputField}
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>


      {/* Phone number input */}
      <View style={styles.inputContainer}>
         <TextInput
          style={styles.inputField}
          placeholder="your phone number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
      </View>

      {/* Shipping address input */}
      <View style={styles.inputContainer}>
         <TextInput
          style={styles.inputField}
          placeholder="your shipping address"
          value={shippingAddress}
          onChangeText={text => setShippingAddress(text)}
        />
      </View>
    
          <TouchableOpacity style={styles.submitButton} onPress={submitOrder}>
            <Text style={styles.submitButtonText}>Submit Order</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const styles = StyleSheet.create({
        container: {
           justifyContent:'center',
           alignItems:'center',
           flex: 1,
         },
         item: {
            fontSize: 16,
            fontWeight: 'bold',
            marginRight:6,
         },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
        },
        orderSummary: {
          marginBottom: 16,
        },
        summaryTitle: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 8,
        },
        itemContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        },
        totalText: {
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 16,
        },
        inputContainer: {
          marginBottom: 16,
        },
        inputLabel: {
          fontSize: 16,
          marginBottom: 8,
        },
        inputField: {
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          fontSize: 16,
        },
        submitButton: {
            borderRadius:5,
            borderWidth:3,
            borderColor:Colors.Icon,
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        },
        submitButtonText: {
          color: 'black',
          fontSize: 18,
          fontWeight: 'bold',
        },
      });
      

export default CheckOut