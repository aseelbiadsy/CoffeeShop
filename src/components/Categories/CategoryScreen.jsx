import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Category from "./Category";
import Drinks from "./Drinks";
import "./CategoryScreen.css";

export default function CategoryScreen() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIdCategory, setSelectedIdCategory] = useState("All");

  const handlePress = () => {
    if (!searchInput.trim()) return;
    console.log("Search:", searchInput);
  };

  return (
    <section className="category-screen">
      <h2 className="category-screen-title">Categories</h2>

      <div className="category-screen-search">
        <input
          placeholder="Search any Hot Drink"
          className="category-screen-search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="category-screen-search-btn" onClick={handlePress}>
          <FaSearch size={16} color="gray" />
        </button>
      </div>

      <Category onSelectCategory={setSelectedIdCategory} selectedIdCategory={selectedIdCategory} />

      <Drinks categoryNameforRecipes={selectedIdCategory} />
    </section>
  );
}
