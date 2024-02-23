import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Colors from '../../constans/Colors/Colors';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../constans/Urls/Url';
import axios from 'axios';

const Category = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState(null);

  const handleButtonHover = (buttonKey) => {
    setIsButtonPressed(buttonKey );
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await axios.get(`${BASE_URL}/categories`);
        //console.log("categoriesData", categoriesData);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
       }
    };

     fetchData();
  }, []);

  const handlePress = (category) => {
    //console.log('Category id:', category._id);
    onSelectCategory(category._id);
  };

  return (
    <View style={styles.container}>
       <Animated.View entering={FadeInDown.duration(800).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <TouchableOpacity
          style={[
            styles.categoryContainer,
            isButtonPressed === 'All' && { backgroundColor: '#c8aaaa' },
          ]}
          onPress={() => onSelectCategory('All')}
          onMouseEnter={() => handleButtonHover('All')}
          onMouseLeave={() => handleButtonHover(null)}
        >
          <Text style={styles.categoryName}>All</Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            style={[
              styles.categoryContainer,
              isButtonPressed === index && { backgroundColor: '#c8aaaa' },
            ]}
            key={index}
            onPress={() => onSelectCategory(category._id)}
            onMouseEnter={() => handleButtonHover(index)}
            onMouseLeave={() => handleButtonHover(null)}
          >
            <Text style={styles.categoryName}>{category.strCategory}</Text>
          </TouchableOpacity>
        ))}
        
      </ScrollView>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  categoryName: {
    alignItems: 'center',
     borderColor: Colors.Icon,
     borderBottomWidth:3,
    flex: 1,
    padding:4,
    margin: 6,
    fontSize: 20,
    fontFamily: 'w2',
    justifyContent: 'center',
    textAlign: 'center',
  },
  categoryContainer: {
    borderRadius: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

export default Category;
