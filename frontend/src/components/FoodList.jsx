import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodList = () => {
  const [foods, setFoods] = useState([]); // State to store food data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get("http://localhost:5174");
        setFoods(response.data); // Update state with fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div>
      <h1>Food List</h1>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <strong>{food.name}</strong>: {food.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
