import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  // State to hold form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderDetails = {
      ...formData,
      address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
      cartDetails: cartItems,
      totalAmount: getTotalCartAmount() + deliveryFee,
    };

    try {
      const response = await axios.post("http://localhost:5000/place-order", orderDetails);
      alert(response.data.message);
      navigate("/thank-you"); // Navigate to a thank-you page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <button className="GoBack" onClick={() => navigate("/cart")}>
        ⬅️Go Back to Cart Page
      </button>

      <form className="place-order" onSubmit={handlePlaceOrder}>
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleInputChange}
            required
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="multi-fields">
            <input
              type="number"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  $
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + deliveryFee}
                </b>
              </div>
            </div>
            <button type="submit" disabled={getTotalCartAmount() === 0}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
