import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";


const Home = () => {
  // Set initial category state to 'All'
  const [category, setCategory] = useState("All");

  return (
    <div className="home-container">
      {/* Header Component */}
      <Header />

      {/* Explore Menu - Allows the user to select a category */}
      <div className="explore-menu-container">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      {/* Food Display Component - Shows food items based on selected category */}
      <div className="food-display-container">
        <FoodDisplay category={category} />
      </div>

      {/* App Download Section - Show options for downloading the app */}
      <div className="app-download-container">
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
