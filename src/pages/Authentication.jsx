import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import hero from "../images/hero.webp";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/allApi";
 // Ensure this import is correct

const Authentication = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  // Handle user input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (userData.username && userData.password) {
      try {
        const result = await loginApi(userData);

        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setUserData({ username: "", password: "" });
          alert("Login Successful!");
          navigate("/Dashboard");
        } else if (result.response?.status === 404) {
          alert(result.response.data);
        }
      } catch (err) {
        console.error("Login Error:", err);
        alert("An error occurred during login. Please try again.");
      }
    } else {
      alert("Please fill the form completely!");
    }
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%" }} className="bg-dark row">
      <div className="col-lg-2"></div>
      <div
        className="bg-light col-lg-8 text-light p-5 d-flex justify-content-center text-dark mt-5 mb-5"
        style={{ borderRadius: "500px 300px 0 400px" }}
      >
        <div className="w-75">
          <div className="d-flex justify-content-center">
            <div style={{ fontFamily: "Squada One, sans-serif" }}>
              <div className="fs-1 text-center">
                Trouble<span style={{ color: "#6e1212" }}>Shooter</span>
              </div>
              <h1 className="fw-bold text-center">
                <u>Hero Login</u>
              </h1>
              <img src={hero} alt="Hero Illustration" />
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3 mt-5 text-dark"
            >
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </FloatingLabel>
            <div className="pb-5">
              <button
                type="submit"
                className="btn btn-dark w-100 p-3 fw-bold shadow"
              >
                Login
              </button>
              <hr />
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-2"></div>
    </div>
  );
};

export default Authentication;
