import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const userExists = existingUsers.find(
      (user) => user.email === form.email
    );

    if (userExists) {
      alert("User already registered with this email");
      return;
    }

    // Save new user
    existingUsers.push(form);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "20px" }}>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Select Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
          <option value="marketing">Marketing Specialist</option>
          <option value="artisan">Artisan</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Register
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#4CAF50", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #111, #222)",
  color: "white"
};

const formStyle = {
  background: "#1c1c1c",
  padding: "40px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  width: "350px",
  boxShadow: "0 0 15px rgba(0,0,0,0.6)"
};

const inputStyle = {
  marginBottom: "15px",
  padding: "10px",
  borderRadius: "6px",
  border: "none"
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Register;