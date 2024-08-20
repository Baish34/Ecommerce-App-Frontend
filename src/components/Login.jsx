import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, status, error } = useSelector((state) => state.user);

   console.log('UserInfo:', userInfo); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }
    dispatch(loginUser({ email, password, phoneNumber, name })).then(
      (result) => {
        if (result.type === "user/loginUser/fulfilled") {
          navigate("/"); // Redirect to home on successful login
        }
      },
    );
  };

  return (
    <>
      <Header />
    <div className="container py-3">
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Login"}
        </button>
        {error && <div className="alert alert-danger">{error.message || error}</div>}
      </form>
    </div>
      </>
  );
};

export default Login;
