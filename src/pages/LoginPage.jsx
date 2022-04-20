import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../component/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigator = useNavigate();

  //  LOGIN USER FINCTION
  const login = async e => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill all fields");
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userCredential.user)
          );
          setLoading(false);
          toast.success("Login successfull");
          navigator("/");
        })
        .catch(error => {
          const errorCode = error.code;
          setLoading(false);
          toast.error(errorCode);
        });
    }
  };
  return (
    <div className="login-parent container-fluid">
      {loading && <Loader />}
      <div className="login-bottom"></div>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="col-md-4">
          <form>
            <div className="register-form">
              <h2>Login </h2>
              <hr />
              <input
                type="text"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <button type="submit" className="my-3" onClick={login}>
                {" "}
                LOGIN
              </button>
              <hr />
              <Link to="/register">click here to Register</Link>
            </div>
          </form>
        </div>
        <div className="col-md-5">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_hu9cd9.json"
            background="transparent"
            speed="1"
            style={{ width: "38rem", height: "38rem" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
