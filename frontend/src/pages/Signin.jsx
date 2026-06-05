import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../AuthContext";
import { Link } from "react-router-dom";
import Signup from "./Signup.jsx";
import { toast } from "react-toastify";
function Signin() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!userName && !email) {
      setError("Username or Email is required");
      return;
    }

    if (userName && email) {
      setError("Please enter either Username or Email");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const data = { password };

      if (userName) {
        data.userName = userName;
      } else {
        data.email = email;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,
        data,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.userResponse);
            

      // navigate("/"); 
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f4f5",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        background: "#fff",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "8px",
        }}
      >
        Welcome Back
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "24px",
        }}
      >
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "500",
            }}
          >
            Username or Email
          </label>

          <input
            type="text"
            placeholder="Enter username or email"
            value={userName || email}
            onChange={(e) => {
              const value = e.target.value;

              if (value.includes("@")) {
                setEmail(value);
                setUserName("");
              } else {
                setUserName(value);
                setEmail("");
              }

              setError("");
            }}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "500",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: isSubmitting
              ? "not-allowed"
              : "pointer",
          }}
        >
          {isSubmitting
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);
}

export default Signin;