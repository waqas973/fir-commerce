import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../component/Loader";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  //  REGISTER USER FUNCTION
  const submitForm = async e => {
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "") {
      toast.error("Please fill all fields");
    } else {
      if (password !== cPassword) {
        toast.error("Password does not match");
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            // ...
            setLoading(false);
            toast.success("registration successfull");
          })
          .catch(error => {
            const errorCode = error.code;
            setLoading(false);
            toast.error(errorCode);
          });
      }
    }
  };
  return (
    <div className="register-parent container-fluid">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="col-md-5">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: "38rem", height: "38rem" }}
          ></lottie-player>
        </div>
        <div className="col-md-4">
          <form>
            <div className="register-form">
              <h2>Register</h2>
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
              <input
                type="text"
                className="form-control"
                placeholder="Cpassword"
                value={cPassword}
                onChange={e => setCPassword(e.target.value)}
              />
              <button type="submit" className="my-3" onClick={submitForm}>
                {" "}
                REGISTER
              </button>
              <hr />
              <Link to="/login">click here to Login </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
