import { Link } from "react-router-dom";
import AuthContext from "../store/authContext";
import { useContext, useState } from "react";

const Navbar = function ({ isLoggedIn }) {
  const authCtx = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Lama App
        </Link>
      </span>
      {authCtx.isLoggedIn ? (
        <ul className="list">
          <li className="listItem">
            <img
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src="https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100__340.jpg"
              alt=""
              className="avtar"
            ></img>
          </li>
          <li className="listItem">Saurav Kumar</li>
          <li className="listItem" onClick={authCtx.logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
