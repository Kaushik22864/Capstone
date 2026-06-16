import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerificationPending from "./pages/VerificationPending";
import Login from "./pages/Login";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification-pending" element={<VerificationPending />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/analysis" element={<Analysis />} />
    </Routes>
  );
}

export default App;