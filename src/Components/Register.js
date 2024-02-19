import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = inpval;
    if (name === "") {
       toast.warning("name is required!", {
        position:"top-center"
      });
    } else if (email === "") {
       toast.error("email is required!", {
        position:"top-center"
      });
    } else if (!email.includes("@") || !email.includes("."))  {
       toast.warning("incorrect email!", {
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
    } else if (cpassword === "") {
       toast.error("confirm password is required!", {
        position:"top-center"
      });
    } else if (cpassword.length < 6) {
       toast.error("confirm password must be 6 char!", {
        position:"top-center"
      });
    } else if (password !== cpassword) {
       toast.error("password and confirm password are not matching!", {
        position:"top-center"
      });
    } else {
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      
      if (res.status === 201) {
         toast.success("Registration Successfully done!", {
        position:"top-center"
      });
        setInpval({
          ...inpval,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }

      if(res.status === 522){
        toast.warning("User already exists!", {
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
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage
              <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label>Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.name}
                name="name"
                id="name"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label>Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label>Password</label>
              <div className="two">
                <input
                  type={!show ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                />
                <div className="showpass" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label>Confirm Password</label>
              <div className="two">
                <input
                  type={!confirmShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setConfirmShow(!confirmShow)}
                >
                  {confirmShow ? "Hide" : "Show"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              Already have an Account? <NavLink to="/">Login</NavLink>
            </p>
          </form>
          <ToastContainer/>
        </div>
      </section>
    </>
  );
};

export default Register;
