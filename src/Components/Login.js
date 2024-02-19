import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";
import { ToastContainer,toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();
  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
      toast.error("email is required!", {
        position:"top-center"
      });
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.warning("Enter valid email!", {
        position:"top-center"
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position:"top-center"
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position:"top-center"
      });
    } else {

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const res = await data.json();
      
      if (res.status === 201) {
        localStorage.setItem("usersdatatoken",res.result.token);
        history("/dashboard");
        setInpval({
          ...inpval,
          email: "",
          password: "",
        });
      }
      if(res.status === 502){
        toast.warning("Invalid user", {
          position:"top-center"
        });
      }
      if(res.status === 501){
        toast.warning("Incorrect password", {
          position:"top-center"
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_header">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please Login</p>
          </div>
          <form>
            <div className="form_input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={inpval.email}
                onChange={setVal}
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label>Password</label>
              <div className="two">
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  value={inpval.password}
                  onChange={setVal}
                  id="password"
                  placeholder="Enter Your Password"
                />
                <div className="showpass" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
            <p style={{color:"black",fontWeight:"bold"}}>
              Forgot Password <NavLink to="/password-reset">click here</NavLink>
            </p>
          </form>
          <ToastContainer/>
        </div>
      </section>
    </>
  );
};

export default Login;