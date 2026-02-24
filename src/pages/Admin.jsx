import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const storedCampaigns =
      JSON.parse(localStorage.getItem("campaigns")) || [];
    setCampaigns(storedCampaigns);

    const storedBag =
      JSON.parse(localStorage.getItem("bag")) || [];

    const totalRevenue = storedBag.reduce(
      (total, item) => total + item.price,
      0
    );

    setRevenue(totalRevenue);
  }, []);

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter(
      (user) => user.email !== email
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div style={containerStyle}>

      {/* Top Bar */}
      <div style={topBarStyle}>
        <h1>Admin Dashboard</h1>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Platform Stats */}
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div style={statCardStyle}>
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div style={statCardStyle}>
          <h2>{campaigns.length}</h2>
          <p>Total Campaigns</p>
        </div>

        <div style={{ ...statCardStyle, backgroundColor: "#1b5e20" }}>
          <h2>₹ {revenue}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      {/* User Management */}
      <div style={{ marginTop: "50px" }}>
        <h2>Manage Users</h2>

        {users.length === 0 ? (
          <p>No users registered.</p>
        ) : (
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{user.name}</td>
                    <td style={tdStyle}>{user.email}</td>
                    <td style={tdStyle}>{user.role}</td>
                    <td style={tdStyle}>
                      <button
                        style={deleteButtonStyle}
                        onClick={() =>
                          handleDeleteUser(user.email)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#111",
  color: "white",
  padding: "40px"
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px"
};

const logoutButtonStyle = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#f44336",
  color: "white",
  fontWeight: "bold"
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px"
};

const statCardStyle = {
  backgroundColor: "#222",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center"
};

const tableContainerStyle = {
  marginTop: "20px",
  overflowX: "auto"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#222"
};

const thStyle = {
  padding: "15px",
  borderBottom: "1px solid #444",
  textAlign: "left"
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #444"
};

const deleteButtonStyle = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#e53935",
  color: "white"
};

export default Admin;