import React, { useState, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import UserContext from "../AuthContext";

function Signup() {
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

    if (!userName.trim()) {
      setError("Username is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUser(response.data.userResponse);

      navigate("/");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to create account"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "10px",
            cursor: isSubmitting
              ? "not-allowed"
              : "pointer",
          }}
        >
          {isSubmitting
            ? "Creating Account..."
            : "Sign Up"}
        </button>
      </form>

      <p
        style={{
          marginTop: "15px",
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Link to="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Signup;