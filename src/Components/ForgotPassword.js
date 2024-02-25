import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPassword = () => {
  const { id, token } = useParams();
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [dataa, setData] = useState(false);

  const userValid = async () => {
    const res = await fetch(`${process.env.URL}/forgotpassword/${id}/${token}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status == 201) {
      console.log("User Valid");
    } else {
      console.log("User Invalid");
      history("*");
    }
  };

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.status == 201) {
        setPassword("");
        setMessage(true);
      } else {
        toast.error("!Token Expired Generate New Link", {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {dataa ? (
        <>
          <section>
            <div className="form_data">
              <div className="form_header">
                <h1>Enter Your New Password</h1>
              </div>
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Password Updated Successfully
                </p>
              ) : (
                ""
              )}
              <form>
                <div className="form_input">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={setVal}
                    id="email"
                    placeholder="Enter Your New Password"
                  />
                </div>

                <button className="btn" onClick={updatePassword}>
                  Send
                </button>
              </form>
              <p>
                <NavLink to="/">Home</NavLink>
              </p>
              <ToastContainer />
            </div>
          </section>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...&nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
