import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Marketing() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [discount, setDiscount] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const storedCampaigns =
      JSON.parse(localStorage.getItem("campaigns")) || [];
    setCampaigns(storedCampaigns);
  }, []);

  const handleCreateCampaign = (e) => {
    e.preventDefault();

    if (!campaignName || !discount) {
      alert("Fill all fields");
      return;
    }

    const newCampaign = {
      id: Date.now(),
      name: campaignName,
      discount: Number(discount)
    };

    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));

    setCampaignName("");
    setDiscount("");
  };

  const handleDeleteCampaign = (id) => {
    const updatedCampaigns = campaigns.filter(
      (c) => c.id !== id
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div style={containerStyle}>

      {/* Top Bar */}
      <div style={topBarStyle}>
        <h1>Marketing Specialist Dashboard</h1>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Campaign Creation */}
      <div style={formContainerStyle}>
        <h2>Create Campaign</h2>
        <form onSubmit={handleCreateCampaign} style={formStyle}>
          <input
            type="text"
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={createButtonStyle}>
            Create Campaign
          </button>
        </form>
      </div>

      {/* Campaign List */}
      <div style={{ marginTop: "40px" }}>
        <h2>Active Campaigns</h2>

        {campaigns.length === 0 ? (
          <p>No campaigns created yet.</p>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign.id} style={campaignCardStyle}>
              <h3>{campaign.name}</h3>
              <p>Discount: {campaign.discount}%</p>
              <button
                style={deleteButtonStyle}
                onClick={() => handleDeleteCampaign(campaign.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Product Preview with Discount */}
      <div style={{ marginTop: "50px" }}>
        <h2>Products with Campaign Preview</h2>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div style={productGridStyle}>
            {products.map((product) => {
              const activeDiscount =
                campaigns.length > 0
                  ? campaigns[campaigns.length - 1].discount
                  : 0;

              const discountedPrice =
                product.price -
                (product.price * activeDiscount) / 100;

              return (
                <div key={product.id} style={productCardStyle}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={imageStyle}
                  />
                  <h3>{product.name}</h3>

                  {activeDiscount > 0 ? (
                    <>
                      <p style={{ textDecoration: "line-through" }}>
                        ₹ {product.price}
                      </p>
                      <p style={{ color: "#4CAF50", fontWeight: "bold" }}>
                        ₹ {discountedPrice}
                      </p>
                    </>
                  ) : (
                    <p>₹ {product.price}</p>
                  )}
                </div>
              );
            })}
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
  marginBottom: "30px"
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

const formContainerStyle = {
  backgroundColor: "#222",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "500px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none"
};

const createButtonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const campaignCardStyle = {
  backgroundColor: "#222",
  padding: "20px",
  marginTop: "15px",
  borderRadius: "10px"
};

const deleteButtonStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#e53935",
  color: "white"
};

const productGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
  marginTop: "20px"
};

const productCardStyle = {
  backgroundColor: "#222",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center"
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

export default Marketing;