import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/authContext";
import { AuthContextProvider } from "./store/authContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  let authCtx = useContext(AuthContext);
  let isLoggedIn = authCtx.isLoggedIn;

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/post/:id"
          element={isLoggedIn ? <Post /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
