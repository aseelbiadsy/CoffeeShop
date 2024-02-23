import {
  searchInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {getDrinkByName} from '../../../server/controllers/authController';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constans/Colors/Colors";
import Category from "./Category";
import Drinks from "./Drinks";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { getCategoryById } from "../../../server/controllers/authController";

export default function CategoryScreen({ route }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIdCategory, setSelectedIdCategory] = useState("");
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategotyById = async () => {
      try {
        console.log("Fetching Category by id:", selectedIdCategory);
        const response = await getCategoryById(selectedIdCategory);

       // console.log("Category Data:", response);

        if (response?.status === 200) {
          const Category = response?.data;
          //console.log("Category:", Category);
          setCategory(Category);
        } else {
          console.error("Error fetching Category details:", response?.data);
          return null;
        }
      } catch (error) {
        console.error("Error during request:", error);
        return null;
      }
    };

    fetchCategotyById();
  }, []);

  console.log(
    "CategoryScreen : Category Id from Category.js",
    selectedIdCategory
  );

  const handlePress = async () => {
    console.log("handle Press  # ");
 
    if (!searchInput.trim()) return;
    try {
      console.log("handle Press1");
      const response = await getDrinkByName(searchInput);
       console.log("handle Press2 " + response.data); ;
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* title */}
        <View style={styles.avatorAndIcon}>
          <Text style={styles.title}>Categories</Text>
        </View>
        {/* search bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search any Hot Drink"
            placeholderTextColor="gray"
            style={styles.searchInput}
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handlePress}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        {/* search   */}
        <Text style={styles.SearchResult}>
          {!searchInput || searchInput.trim() === "" ? (
            ""
          ) : (
            <TouchableOpacity
               onPress={() => SearchPress(searchInput)}
            >
            </TouchableOpacity>
          )}
        </Text>

        {/* categories */}
        <View style={styles.categoriesContainer}>
          <Category
            onSelectCategory={(category) => setSelectedIdCategory(category)}
          />
        </View>

        {/* recipes */}
        <View style={styles.greetingsContainer}>
          <Text style={styles.punchlineText}> </Text>
          <Drinks categoryNameforRecipes={selectedIdCategory} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  avatorAndIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(2),
    marginBottom: 50,
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingsContainer: {
   
    marginLeft: 40,
  },
  greetingsText: {
    fontSize: hp(1.7),
    color: "gray",
  },
  punchlineText: {
    fontSize: hp(3.8),
    fontWeight: "bold",
    color: "gray",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
  amberText: {
    color: "orange",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(4),
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: hp(2),
    padding: hp(1),
  },
  searchInput: {
    flex: 1,
    fontSize: hp(1.7),
    marginBottom: hp(1),
    paddingLeft: wp(3),
  },
  searchIcon: {
    backgroundColor: "white",
    borderRadius: hp(2),
    padding: hp(1.5),
    marginLeft: wp(2),
  },
  SearchResult: {
    paddingTop: 12,
    marginLeft: 20,
  },
  categoriesContainer: {
    marginLeft: 40,
  },
});
