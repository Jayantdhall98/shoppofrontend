import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
export default function Payment() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [mobileError, setMobileError] = useState("");
  //   const [orderid, setOrderid] = useState("");
  //   const [orderamount, setOrderamount] = useState("");
  const { state } = useLocation();

  // Define a map that contains states and their corresponding cities
  const citiesByState = {
    Punjab: [
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Pathankot",
      "Hoshiarpur",
      "Moga",
      "Batala",
      "Abohar",
      "Malerkotla",
      "Khanna",
      "Mohali",
      "Barnala",
      "Firozpur",
      "Phagwara",
      "Muktasar",
      "Faridkot",
      "Rajpura",
      "Kapurthala",
      "Gurdaspur",
      "Sangrur",
      "Nabha",
      "Fazilka",
      "Fatehgarh Sahib",
      "Ropar",
      "Gobindgarh",
    ],
    Haryana: [
      "Gurgaon",
      "Faridabad",
      "Hisar",
      "Panipat",
      "Karnal",
      "Sonipat",
      "Yamunanagar",
      "Rohtak",
      "Panchkula",
      "Ambala",
      "Sirsa",
      "Bhiwani",
      "Bahadurgarh",
      "Jind",
      "Thanesar",
      "Kaithal",
      "Rewari",
      "Palwal",
      "Hansi",
      "Narnaul",
      "Fatehabad",
      "Jagadhri",
      "Tohana",
      "Gohana",
      "Narwana",
      "Hodal",
      "Pinjore",
      "Shahabad",
      "Nuh",
    ],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Ajmer",
      "Kota",
      "Bikaner",
      "Alwar",
      "Bhilwara",
      "Sikar",
      "Barmer",
      "Bharatpur",
      "Tonk",
      "Pali",
      "Sawai Madhopur",
      "Dausa",
      "Nagaur",
      "Chittorgarh",
      "Churu",
      "Hanumangarh",
      "Dholpur",
      "Rajsamand",
      "Karauli",
      "Sirohi",
      "Ganganagar",
      "Dungarpur",
      "Banswara",
      "Jaisalmer",
      "Baran",
      "Sri Ganganagar",
    ],
    // Add more states and cities as needed
  };

  const states = Object.keys(citiesByState);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    // Clear the selected city when the state changes
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const validateMobile = (value) => {
    // Regular expression to validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(value);
  };

  const handleMobileChange = (event) => {
    const mobileValue = event.target.value;
    setMobile(mobileValue);
    if (!validateMobile(mobileValue)) {
      setMobileError("Please enter a valid 10-digit mobile number");
    } else {
      setMobileError("");
    }
  };

  // const ordersave = async () => {
  //     try {

  //         console.log(orderid,orderamount)
  //       const response = await fetch("http://localhost:5002/api/order/orderplaced", {
  //         method: "POST",
  //         credentials: 'include',
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           orderid: orderid,
  //           name: `${firstname} ${lastname}`,
  //           products: [
  //             {
  //               productId: state.ProductId,
  //               quantity: state.quantity,
  //             },
  //           ],
  //           amount: orderamount,
  //           address: {
  //             address: address,
  //             state: selectedState,
  //             city: selectedCity,
  //             pincode: pincode,
  //           },
  //           mobile: mobile,
  //           email: email,
  //         })
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  const placeOrder = async () => {
    // Check if all fields are filled and mobile number is valid
    if (
      !firstname ||
      !lastname ||
      !address ||
      !pincode ||
      !selectedState ||
      !selectedCity ||
      !email ||
      !mobile ||
      !validateMobile(mobile)
    ) {
      alert("Please fill out all fields correctly");
      return;
    }
  
    try {
      // Call HandleCheckout function to initiate the checkout process
      await HandleCheckout();
      
      // If HandleCheckout function does not throw any error, log the success message
      console.log("Order placed successfully!");
    } catch (error) {
      // If HandleCheckout function throws an error, log the error
      console.error("Error while placing order:", error);
      // Optionally, show an alert or message to the user about the error
      alert("An error occurred while placing the order. Please try again later.");
    }
  };
  

  //payment

  const HandleCheckout = async (req,res) => {
    const amount = state.price * state.quantity;

    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:5002/key");
      axios.defaults.withCredentials=true;
      const { data: { order }} = await axios.post("http://localhost:5002/api/order/checkout", {
        amount: amount,
        name: `${firstname} ${lastname}`,

        productId:state&&state.ProductId,
        quantity:state&&state.quantity,

        address: address,
        state: selectedState,
        city: selectedCity,
        pincode: pincode,

        mobile: mobile,
        email: email,
      });

      const options = {
        key: key,
        amount: order&&order.amount,
        currency: "INR",
        name: state&&state.title,
        description: state&&state.desc,
        image: state&&state.img,
        order_id: order&&order.id,
        callback_url: "http://localhost:5002/api/order/paymentverification",
        prefill: {
          name: `${firstname} ${lastname}`,
          email: email,
          contact: mobile,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.on("payment.success", async (response) => {
        console.log("Payment successful:", response);
      });
      razor.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="card my-4 shadow-3">
              <div className="row g-0">
                <div className="col-xl-6 d-xl-block bg-image">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp"
                    alt="Sample photo"
                    className="img-fluid"
                  />
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                  >
                    <div className=" justify-content-center align-items-center h-100">
                      <div className=" text-center" style={{ marginTop: 220 }}>
                        <i className="fas fa-truck text-white fa-3x" />
                        <p className="text-white title-style">
                          Lorem ipsum delivery
                        </p>
                        <p className="text-white mb-0" />
                        <figure className="text-center mb-0">
                          <blockquote className="blockquote text-white">
                            <p className="pb-3">
                              <i
                                className="fas fa-quote-left fa-xs text-primary"
                                style={{ color: "hsl(210, 100%, 50%)" }}
                              />
                              <span className="lead font-italic">
                                Everything at your doorstep.
                              </span>
                              <i
                                className="fas fa-quote-right fa-xs text-primary"
                                style={{ color: "hsl(210, 100%, 50%)" }}
                              />
                            </p>
                          </blockquote>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-4 text-uppercase">Delivery Info</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1m"
                            className="form-control form-control-lg"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1m"
                          >
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1n"
                            className="form-control form-control-lg"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1n"
                          >
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example8">
                        Address
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <select
                          className="form-select border border-secondary"
                          style={{ height: 35 }}
                          required
                          value={selectedState}
                          onChange={handleStateChange}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select
                          className="form-select border border-secondary"
                          style={{ height: 35 }}
                          value={selectedCity}
                          required
                          onChange={handleCityChange}
                          disabled={!selectedState} // Disable city select if no state is selected
                        >
                          <option value="">Select City</option>
                          {selectedState &&
                            citiesByState[selectedState].map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        value={pincode}
                        required
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Zip
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example2"
                        className="form-control form-control-lg"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example2">
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example9"
                        className="form-control form-control-lg"
                        value={mobile}
                        required
                        onChange={handleMobileChange}
                      />
                      <label className="form-label" htmlFor="form3Example9">
                        Mobile
                      </label>
                      {mobileError && (
                        <div className="text-danger">{mobileError}</div>
                      )}
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg ms-2"
                        style={{ backgroundColor: "hsl(210, 100%, 50%)" }}
                        onClick={placeOrder}
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
