import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { useRef, useContext, useState, Fragment } from "react";
import AuthContext from "../store/authContext";
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import "./Login.css";

const Login = function () {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const google = () => {
    const email = emailInputRef.current.value.trim();
    window.open(
      `http://localhost:5000/api/v1/users/google?email=${email}`,
      "_self"
    );
  };

  const github = () => {
    window.open("http://localhost:5000/api/v1/users/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/api/v1/users/facebook", "_self");
  };

  const loginUser = async (email, password) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/v1/users/login",
        data: {
          email,
          password,
        },
      });
      console.log(res);
      if (res.data.status === "success") {
        const cookieOptions = {
          path: "/",
          expires: 10,
        };
        Cookies.set("jwt", res.data.token, cookieOptions);
        const token = Cookies.get("jwt");
        console.log(token);
        authCtx.login(token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log("Signup error!!!!!!");
      console.log(err);
    }
  };

  const formSubmissionHandler = function (event) {
    event.preventDefault();
    const emailInput = emailInputRef.current.value.trim();
    const passwordInput = passwordInputRef.current.value.trim();
    loginUser(emailInput, passwordInput);
  };
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div
        classname="wrapper"
        style={{
          width: "60%",
          height: "75%",
          WebkitBoxShadow: "0px 5px 33px -21px rgba(66, 68, 90, 1)",
          MozBoxShadow: "0px 5px 33px -21px rgba(66, 68, 90, 1)",
          boxShadow: "0px 5px 33px -21px rgba(66, 68, 90, 1)",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
        }}
      >
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" ref={emailInputRef} />
          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          <button className="submit" onClick={formSubmissionHandler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
