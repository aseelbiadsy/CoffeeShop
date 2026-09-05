import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constans/Urls/Url";
import "./BestSeller.css";

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const [bestSellersRes, categoriesRes] = await Promise.all([
          axios.get(`${BASE_URL}/BestSellers`),
          axios.get(`${BASE_URL}/categories`),
        ]);

        const allDrinks = categoriesRes.data.map((category) => category.subcategories).flat();

        const enriched = bestSellersRes.data.map((item) => {
          const match = allDrinks.find((drink) => drink.name === item.name);
          return { ...item, img: match?.img || match?.imgPath };
        });

        setBestSellers(enriched);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="bestseller-screen">
      <h2 className="bestseller-title">Best Sellers</h2>
      <p className="bestseller-subtitle">Our most ordered drinks and treats, ranked by units sold.</p>

      {!loading && bestSellers.length === 0 && (
        <p className="bestseller-empty">No orders yet — best sellers will show up here once customers start ordering.</p>
      )}

      <div className="bestseller-list">
        {bestSellers.map((item, index) => (
          <div key={item.name} className="bestseller-card">
            <span className="bestseller-rank">#{index + 1}</span>
            {item.img && <img src={item.img} className="bestseller-image" alt={item.name} />}
            <div className="bestseller-info">
              <span className="bestseller-name">{item.name}</span>
              <span className="bestseller-sold">{item.totalQuantity} sold</span>
            </div>
            <span className="bestseller-price">{item.price} ₪</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
