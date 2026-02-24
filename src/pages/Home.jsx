import background from "../assets/background.jpg";
import handloom1 from "../assets/handloom1.jpg";
import handloom2 from "../assets/handloom2.jpg";
import handloom3 from "../assets/handloom3.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", color: "white" }}>
      
      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            minHeight: "100vh",
          }}
        >
          {/* Top Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 40px",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            <div><h1>WeaveConnect – A Global Handloom Commerce Platform</h1></div>
            <div>
              <button
                style={buttonStyle}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                style={buttonStyle}
                onClick={() => navigate("/register")}
              >
                Signup
              </button>
            </div>
          </div>

          {/* ROLE CARDS SECTION */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70%",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 250px)",
                gap: "50px",
              }}
            >
              <RoleCard
                title="Buyer"
                onClick={() => navigate("/buyer")}
              />
              <RoleCard
                title="Admin"
                onClick={() => navigate("/admin")}
              />
              <RoleCard
                title="Marketing Specialist"
                onClick={() => navigate("/marketing")}
              />
              <RoleCard
                title="Artisan"
                onClick={() => navigate("/artisan")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div
        style={{
          padding: "80px 40px",
          backgroundColor: "#111",
          lineHeight: "1.8",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "40px",
          }}
        >
          About Handlooms
        </h2>

        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ marginBottom: "20px" }}>
            Handlooms are traditional, non-electric weaving devices used to
            create fabric manually. Rooted in the Indus Valley Civilization,
            this eco-friendly sector employs over 3.5 million people,
            with 72% being women.
          </p>

          <p style={{ marginBottom: "20px" }}>
            It is the second-largest employer in India after agriculture,
            supporting rural livelihoods and preserving traditional skills.
            Handloom production is sustainable and serves as an alternative
            to fast fashion.
          </p>

          <p>
            Handlooms represent a blend of art, culture, and economic
            empowerment, often passed down through generations.
          </p>
        </div>
      </div>

      {/* IMAGE GALLERY SECTION */}
      <div
        style={{
          padding: "80px 40px",
          backgroundColor: "#222",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Handloom Collection
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <ImageCard src={handloom1} />
          <ImageCard src={handloom2} />
          <ImageCard src={handloom3} />
        </div>
      </div>

    </div>
  );
}

function RoleCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: "50px",
        borderRadius: "20px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      {title}
    </div>
  );
}

function ImageCard({ src }) {
  return (
    <img
      src={src}
      alt="handloom"
      style={{
        width: "300px",
        height: "300px",
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />
  );
}

const buttonStyle = {
  marginLeft: "15px",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

export default Home;