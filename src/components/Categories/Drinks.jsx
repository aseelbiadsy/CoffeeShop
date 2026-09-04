import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constans/Urls/Url";
import "./Drinks.css";

const Drinks = ({ categoryNameforRecipes }) => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (categoryNameforRecipes && categoryNameforRecipes !== "All") {
          const response = await axios.get(`${BASE_URL}/categories/${categoryNameforRecipes}`);
          setSubcategories(response.data?.subcategories || []);
        } else {
          const response = await axios.get(`${BASE_URL}/categories`);
          const arr = response.data.map((category) => category.subcategories).flat();
          setSubcategories(arr);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [categoryNameforRecipes]);

  const handlePressRecipe = (subCategory) => {
    const encodedSubCategory = encodeURIComponent(JSON.stringify(subCategory));
    navigate(`/Details/${encodedSubCategory}`);
  };

  return (
    <div className="drinks-grid">
      {subcategories &&
        subcategories.length > 0 &&
        subcategories.map((subCategory, index) => (
          <button key={index} className="drink-card" onClick={() => handlePressRecipe(subCategory)}>
            <img src={subCategory.img || subCategory.imgPath} className="drink-card-image" alt={subCategory.name} />
            <span className="drink-card-name">{subCategory.name}</span>
          </button>
        ))}
    </div>
  );
};

export default Drinks;
