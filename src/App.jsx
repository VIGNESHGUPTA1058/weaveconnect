import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Buyer from "./pages/Buyer";
import Admin from "./pages/Admin";
import Marketing from "./pages/Marketing";
import Artisan from "./pages/Artisan";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRole="buyer">
              <Buyer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marketing"
          element={
            <ProtectedRoute allowedRole="marketing">
              <Marketing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artisan"
          element={
            <ProtectedRoute allowedRole="artisan">
              <Artisan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;