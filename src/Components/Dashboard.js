import React, { useEffect, useContext, useState } from "react";
import user from "./user.jpg";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const history = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`${process.env.URL}/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    if (data.status == 401 || !data) {
      history("*");
    } else {
      setLoginData(data);
      history("/dashboard");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={user} style={{ width: "200px, margintop:20" }} alt="!" />
          <h1>
            User Name : {loginData.validUser ? loginData.validUser.name : " "}
          </h1>
          <h1>
            User Email : {loginData.validUser ? loginData.validUser.email : " "}
          </h1>
        </div>
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

export default Dashboard;
