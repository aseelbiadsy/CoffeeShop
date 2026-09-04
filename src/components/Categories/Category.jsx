import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constans/Urls/Url";
import axios from "axios";
import "./Category.css";

const Category = ({ onSelectCategory, selectedIdCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await axios.get(`${BASE_URL}/categories`);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="category-scroller">
      <button
        className={selectedIdCategory === "All" ? "category-pill active" : "category-pill"}
        onClick={() => onSelectCategory("All")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          className={selectedIdCategory === category._id ? "category-pill active" : "category-pill"}
          onClick={() => onSelectCategory(category._id)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default Category;
