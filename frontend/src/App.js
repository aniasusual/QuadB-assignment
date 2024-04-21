import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRedirect from "./pages/LoginRedirect/LoginRedirect";
import "./App.css"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import store from "./store"
import Edit from "./components/edit/Edit";


function App() {


  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login-redirect" element={<LoginRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/edit/:postID" element={<Edit />} /> */}
        {/* <Route path="/create-note" element={<Home />} /> */}




      </Routes>

    </BrowserRouter>
  );
}

export default App;
