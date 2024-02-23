import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../../constans/Colors/Colors";
import { useNavigate } from "react-router-native";
 import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Details = ({ userId }) => {
  const { encodedSubCategory } = useParams();
  const subCategory = JSON.parse(decodeURIComponent(encodedSubCategory));

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = subCategory?.price;
  const nameDrink = subCategory?.name;
  const navigate = useNavigate();

  const handleSizeChange = (newSize) => {
    setSelectedSize((prevSize) => (prevSize === newSize ? null : newSize));
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + increment));
  };

  const totalPrice = pricePerUnit * quantity;

  function generateUniqueId() {
    return uuidv4();
  }

  const addToCart = async () => {
    console.log("userId:", userId);

    if (selectedSize) {
      const productId = generateUniqueId();
      console.log("productId:", productId);
      const orderDetails = {
        productId,
        userId,
        nameDrink,
        quantity,
        pricePerUnit,
      };
      console.log("Request Details:", orderDetails);

      if (!userId) {
        alert("Please login first");
      } else {
        try {
           const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
          existingCart.push(orderDetails);
          localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));

          console.log("Order added:", response);
          alert("Order added to shopping cart.");
        } catch (error) {
          console.error("Error adding order:", error);
          alert("Error adding order. Please try again.");
        }
      }
    } else {
      alert("Size Undefined", "Please select a size before adding to cart.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: subCategory?.img }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.recipeText}>Details for {subCategory?.name}</Text>

        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Select Size</Text>
          <View style={styles.sizeButtonsContainer}>
            {["S", "M", "L"].map((buttonSize) => (
              <TouchableOpacity
                key={buttonSize}
                onPress={() => handleSizeChange(buttonSize)}
                style={[
                  styles.sizeButton,
                  {
                    borderColor:
                      selectedSize === buttonSize ? Colors.Icon : "white",
                  },
                ]}
              >
                <Text>{buttonSize}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.optionLabel}>Select Quantity</Text>
          <View style={styles.quantityButtonsContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange(-1)}>
              <AntDesign name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, margin: 9 }}> {quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(1)}>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text>{totalPrice} ₪</Text>
        </View>

        <TouchableOpacity onPress={addToCart}>
          <Text
            style={[
              styles.addToCartButton,
              { opacity: selectedSize ? 1 : 0.5 },
            ]}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("/")}>
          <Text
            style={[
              styles.addToCartButton,
              { opacity: selectedSize ? 1 : 0.5 },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginRight: 23,
    alignItems: "center",
  },
  imgContainer: {
    width: 500,
    height: 550,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: "60%",
    marginLeft: 90,
    marginTop: 70,
  },
  detailsContainer: {
    marginLeft: 10,
    flexDirection: "column",
    width: 400,
    height: 600,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: Colors.Icon,
    borderRadius: 5,
  },
  recipeText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 15,
  },
  optionLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "w2",
  },
  sizeButtonsContainer: {
    flexDirection: "row",
  },
  sizeButton: {
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    padding: 5,
  },
  quantityButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    flexDirection: "row",
  },
  addToCartButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.Icon,
    borderRadius: 4,
    marginTop: 50,
    color: "white",
  },
});

export default Details;
