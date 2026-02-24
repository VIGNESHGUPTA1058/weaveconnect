import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password &&
        u.role === form.role
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate(`/${user.role}`);
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1 style={titleStyle}>Login to Handloom Platform</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />

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
          Login
        </button>

        <p style={linkTextStyle}>
          Don’t have an account?{" "}
          <span
            style={signupLinkStyle}
            onClick={() => navigate("/register")}
          >
            Signup here
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
  background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
};

const formStyle = {
  background: "#1e1e1e",
  padding: "60px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  width: "450px",
  boxShadow: "0 0 25px rgba(0,0,0,0.7)"
};

const titleStyle = {
  marginBottom: "30px",
  fontSize: "26px",
  textAlign: "center",
  color: "white"
};

const inputStyle = {
  marginBottom: "20px",
  padding: "14px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none"
};

const buttonStyle = {
  padding: "14px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const linkTextStyle = {
  marginTop: "20px",
  textAlign: "center",
  color: "white"
};

const signupLinkStyle = {
  color: "#4CAF50",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;