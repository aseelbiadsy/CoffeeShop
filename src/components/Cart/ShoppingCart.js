import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../constans/Colors/Colors';
import { useState, useEffect } from 'react';
 import { FontAwesome } from '@expo/vector-icons'
import { getOrderById, updateOrderById } from '../../../server/controllers/authController';
 
import {useNavigate} from 'react-router-native';

const ShoppingCart = ({userId}) => {

  const [cart, setCart] = useState({});
   const [totalSum, setTotalSum] = useState(0);
  const navigate = useNavigate();

 const getCartFromLocalStorage = (userId) => {
  const cartKey = `cart_${userId}`;
  const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
 // return existingCart;
  return Array.isArray(existingCart) ? existingCart : [];

};

useEffect(() => {
  const fetchCart = async () => {
    try {
      if (userId) {
        const data = getCartFromLocalStorage(userId);
        setCart(data);
        setTotalSum(calculateTotalSum(data));
      } else {
        console.log('User ID is null');
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchCart();
}, [userId]);

function calculateTotalSum(items) {
  try {
    if (Array.isArray(items)) {
      return items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
    } else {
      console.error('Items is not an array:', items);
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total sum:', error);
    return 0;
  }
}

const updateQuantityInLocalStorage = (productId, newQuantity) => {
  const cartKey = `cart_${userId}`;
  const existingCart = getCartFromLocalStorage(userId);

  const updatedCart = existingCart.map(item => {
    if (item.productId === productId) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });

  localStorage.setItem(cartKey, JSON.stringify(updatedCart));
};

const deleteItemFromLocalStorage = (productId) => {
  const cartKey = `cart_${userId}`;
  const existingCart = getCartFromLocalStorage(userId);

  const updatedCart = existingCart.filter(item => item.productId !== productId);

  localStorage.setItem(cartKey, JSON.stringify(updatedCart));
};

const handleUpdateQuantity = (operation, productId) => {
  setCart((prevCart) => {
    let newQuantity;
    const updatedCart = prevCart.map((item) => {
      if (item.productId === productId) {
        newQuantity = operation === 'increment' ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    updateQuantityInLocalStorage(productId, newQuantity);
    setTotalSum(calculateTotalSum(updatedCart));

    return updatedCart;
  });
};

const handleDeleteItem = (productId) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.filter(item => item.productId !== productId);
    deleteItemFromLocalStorage(productId);
    setTotalSum(calculateTotalSum(updatedCart));
    return updatedCart;
  });
};


  const onBuyPress = () => {
    navigate(`/CheckOut/${encodeURIComponent(JSON.stringify(cart))}`);
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.nameDrink}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleUpdateQuantity('decrement', item.productId)}>
          <FontAwesome name="minus" size={24} color={Colors.Icon} />
        </TouchableOpacity>
        <Text style={styles.itemName}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleUpdateQuantity('increment', item.productId)}>
          <FontAwesome name="plus" size={24} color={Colors.Icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>{`  ${(item.pricePerUnit * item.quantity).toFixed(2)} ₪`}</Text>
      <TouchableOpacity onPress={() => handleDeleteItem(item.productId)}>
        <FontAwesome name="trash" size={24} color={Colors.Icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {userId ? (
        <>
          {cart.length > 0 ? (
            <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
          />
              <View style={styles.totalContainer}>
                <TouchableOpacity style={styles.buyButton} onPress={onBuyPress}>
                  <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
               </View>
            </>
          ) : (
            <>
              <Text style={styles.totalText}>There is no item in your shopping cart.</Text>
            </>
          )}
        </>
      ) : (
        <Text style={styles.totalText}>Please log in to view your shopping cart.</Text>
      )}
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.Border,
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 22,

    marginLeft:4,
    marginRight:4,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  totalText: {
     fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    alignItems:'center',
    paddingRight:40,
   },
  buyButton: {
     borderRadius: 8,
     padding:8,
     },
  buyButtonText: {
     fontSize: 22,
    fontWeight: 'bold',
    alignItems:'center',
   },totalContainer:{
    alignItems: 'center',
    padding: 10,
    margin:20,
   
  },quantityContainer:{
    flexDirection: 'row',
  }
});
export default ShoppingCart



 