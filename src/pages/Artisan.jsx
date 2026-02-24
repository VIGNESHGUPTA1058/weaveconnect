import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Artisan() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!productName || !price || !image) {
      alert("Please fill all fields including image");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: Number(price),
      image: image
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setProductName("");
    setPrice("");
    setImage(null);
    setPreview(null);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div style={containerStyle}>

      <div style={logoutContainerStyle}>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={centerWrapperStyle}>
        <h1 style={titleStyle}>Artisan Dashboard</h1>

        <div style={formContainerStyle}>
          <h2>Add New Product</h2>

          <form onSubmit={handleAddProduct} style={formStyle}>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={inputStyle}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={previewStyle}
              />
            )}

            <button type="submit" style={addButtonStyle}>
              Add Product
            </button>
          </form>
        </div>

        <div style={{ marginTop: "50px", width: "100%" }}>
          <h2>Your Products</h2>

          {products.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            <div style={productGridStyle}>
              {products.map((product) => (
                <div key={product.id} style={productCardStyle}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={imageStyle}
                  />
                  <h3>{product.name}</h3>
                  <p>₹ {product.price}</p>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#111",
  color: "white",
  padding: "40px",
  position: "relative"
};

const logoutContainerStyle = {
  position: "absolute",
  top: "30px",
  right: "40px"
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

const centerWrapperStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
  textAlign: "center"
};

const titleStyle = {
  marginBottom: "40px",
  fontSize: "32px"
};

const formContainerStyle = {
  backgroundColor: "#222",
  padding: "40px",
  borderRadius: "16px",
  maxWidth: "500px",
  margin: "0 auto"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const inputStyle = {
  padding: "15px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px"
};

const previewStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px"
};

const addButtonStyle = {
  padding: "15px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
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
  borderRadius: "12px"
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

const deleteButtonStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#e53935",
  color: "white"
};

export default Artisan;