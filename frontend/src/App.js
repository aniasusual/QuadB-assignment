import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRedirect from "./pages/LoginRedirect/LoginRedirect";
import "./App.css"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/loginRedirect" element={<LoginRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



      </Routes>

    </BrowserRouter>
  );
}

export default App;
