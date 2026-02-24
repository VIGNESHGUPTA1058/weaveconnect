import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Buyer() {
  const navigate = useNavigate();

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const [products, setProducts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [bag, setBag] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("products")) || []
    );

    setCampaigns(
      JSON.parse(localStorage.getItem("campaigns")) || []
    );

    // Load bag specific to user
    const allBags =
      JSON.parse(localStorage.getItem("bags")) || {};

    setBag(allBags[loggedUser.email] || []);

    // Load orders specific to user
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = allOrders.filter(
      (order) => order.buyerEmail === loggedUser.email
    );

    setOrders(userOrders);
  }, []);

  const getActiveDiscount = () => {
    if (campaigns.length === 0) return 0;
    return campaigns[campaigns.length - 1].discount;
  };

  const calculateDiscountedPrice = (price) => {
    const discount = getActiveDiscount();
    return discount > 0
      ? price - (price * discount) / 100
      : price;
  };

  const saveUserBag = (updatedBag) => {
    const allBags =
      JSON.parse(localStorage.getItem("bags")) || {};

    allBags[loggedUser.email] = updatedBag;

    localStorage.setItem("bags", JSON.stringify(allBags));
  };

  const addToBag = (product) => {
    const discountedPrice =
      calculateDiscountedPrice(product.price);

    const updatedBag = [
      ...bag,
      { ...product, finalPrice: discountedPrice }
    ];

    setBag(updatedBag);
    saveUserBag(updatedBag);
  };

  const removeFromBag = (index) => {
    const updatedBag = bag.filter((_, i) => i !== index);
    setBag(updatedBag);
    saveUserBag(updatedBag);
  };

  const totalPrice = bag.reduce(
    (sum, item) => sum + item.finalPrice,
    0
  );

  const handleCheckout = () => {
    if (bag.length === 0) {
      alert("Bag is empty");
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (
      cardNumber.length < 16 ||
      expiry.length < 4 ||
      cvv.length < 3
    ) {
      alert("Invalid payment details");
      return;
    }

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      buyerEmail: loggedUser.email,
      items: bag,
      total: totalPrice,
      date: new Date().toLocaleString()
    };

    const updatedOrders = [...allOrders, newOrder];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear bag
    saveUserBag([]);
    setBag([]);
    setShowPayment(false);

    const userOrders = updatedOrders.filter(
      (order) => order.buyerEmail === loggedUser.email
    );

    setOrders(userOrders);

    alert("Payment Successful!");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const activeDiscount = getActiveDiscount();

  return (
    <div style={containerStyle}>
      <div style={topBarStyle}>
        <h1>Buyer Dashboard</h1>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {activeDiscount > 0 && (
        <div style={bannerStyle}>
          🎉 {activeDiscount}% Discount Active!
        </div>
      )}

      <h2>Available Products</h2>

      <div style={productGridStyle}>
        {products.map((product) => {
          const discountedPrice =
            calculateDiscountedPrice(product.price);

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
                  <p style={discountPriceStyle}>
                    ₹ {discountedPrice}
                  </p>
                </>
              ) : (
                <p>₹ {product.price}</p>
              )}

              <button
                style={addButtonStyle}
                onClick={() => addToBag(product)}
              >
                Add to Bag
              </button>
            </div>
          );
        })}
      </div>

      <h2 style={{ marginTop: "50px" }}>Your Bag</h2>

      {bag.length === 0 ? (
        <p>No items in bag.</p>
      ) : (
        <>
          {bag.map((item, index) => (
            <div key={index} style={bagItemStyle}>
              {item.name} - ₹ {item.finalPrice}
              <button
                style={removeButtonStyle}
                onClick={() => removeFromBag(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹ {totalPrice}</h3>

          <button
            style={checkoutButtonStyle}
            onClick={handleCheckout}
          >
            Proceed to Payment
          </button>
        </>
      )}

      <h2 style={{ marginTop: "60px" }}>Order History</h2>

      {orders.length === 0 ? (
        <p>No previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={orderCardStyle}>
            <p>Order ID: {order.id}</p>
            <p>Date: {order.date}</p>
            <p>Total: ₹ {order.total}</p>
          </div>
        ))
      )}

      {showPayment && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Payment Details</h2>
            <form onSubmit={handlePayment} style={formStyle}>
              <input
                type="text"
                placeholder="Card Number"
                onChange={(e) =>
                  setCardNumber(e.target.value)
                }
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Expiry (MMYY)"
                onChange={(e) =>
                  setExpiry(e.target.value)
                }
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="CVV"
                onChange={(e) => setCvv(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={payButtonStyle}>
                Pay ₹ {totalPrice}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#111",
  color: "white",
  padding: "40px"
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "30px"
};

const logoutButtonStyle = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#f44336",
  color: "white",
  cursor: "pointer"
};

const bannerStyle = {
  backgroundColor: "#4CAF50",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px",
  textAlign: "center",
  fontWeight: "bold"
};

const productGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px"
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
  borderRadius: "10px"
};

const discountPriceStyle = {
  color: "#4CAF50",
  fontWeight: "bold"
};

const addButtonStyle = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

const bagItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#222",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px"
};

const removeButtonStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#e53935",
  color: "white",
  cursor: "pointer"
};

const checkoutButtonStyle = {
  marginTop: "15px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

const orderCardStyle = {
  backgroundColor: "#222",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "15px"
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  backgroundColor: "#222",
  padding: "30px",
  borderRadius: "12px",
  width: "350px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none"
};

const payButtonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

export default Buyer;