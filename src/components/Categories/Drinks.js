import { ScrollView,View, Text ,StyleSheet,TouchableOpacity,Image} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {useNavigate} from 'react-router-native';
import { useFonts } from "expo-font";
import Colors from '../../constans/Colors/Colors';
import axios from 'axios';
import { BASE_URL } from '../../constans/Urls/Url';



 const Drinks = ({categoryNameforRecipes}) => {

  // console.log("categoryNameforRecipes",categoryNameforRecipes);
    useFonts({
        W2: require("../../../assets/Fonts/Tajawal-Bold.ttf"),
     });
       const navigate = useNavigate();
      const [subcategories, setSubcategories] = useState([]);

      useEffect(() => {
        const fetchSubcategories = async () => {
          console.log("use Effect-> category by id");
          try {
            if (categoryNameforRecipes && categoryNameforRecipes !== 'All') {
               const response = await axios.get(`${BASE_URL}/categories/${categoryNameforRecipes}`);
             // console.log("Subcategories Data:", response.data?.subcategories);
              setSubcategories(response.data?.subcategories);
            } else {
              response = await axios.get(`${BASE_URL}/categories`);
              const arr = response.data.map(category => category.subcategories).flat();
             // console.log("All Categories Data:", arr);
              setSubcategories(arr);
            }
          } catch (error) {
            console.error("Error fetching subcategories:", error);
          }
        };
    
        fetchSubcategories();
      }, [categoryNameforRecipes]);
      const handlePressRecipe = (subCategory) => {
        //console.log('Selected Subcategory:', categoryNameforRecipes );
      
        // console.log('Selected drink id:',subCategory.name );
         const encodedSubCategory  = encodeURIComponent(JSON.stringify(subCategory));
          navigate(`/Details/${encodedSubCategory}`);
 
      };
    
      return (
        <View style={styles.greetingsContainer}>
          <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
               
               contentContainerStyle={styles.scrollViewContent}
               showsVerticalScrollIndicator={true}
              horizontal={false}
            
              className="space-x-4"
            >
              {subcategories &&
                subcategories?.length > 0 &&
                subcategories.map((subCategory, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recipeContainer}
                    onPress={() => handlePressRecipe(subCategory)}
                  >
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: subCategory.img }}
                        style={{
                          width: 130,
                          height: 130,
                          borderRadius: 9,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      />
                    </View>
                    <Text style={styles.recipeText}>{subCategory.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </Animated.View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      greetingsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
         
      },
      scrollViewContent: {
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
         flexWrap: 'wrap', 
      },
      recipeContainer: {
        marginRight: 8,
        borderColor: Colors.Icon,
        borderRadius: 6,
        borderWidth: 2,
        width: 220,
        height: 280,
        marginBottom: 20,
        flexDirection: 'column',
      },
      recipeText: {
        fontFamily: 'w2',
        color: 'black',
        textAlign: 'center',
        fontSize: 30,
      },
      imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

export default Drinks