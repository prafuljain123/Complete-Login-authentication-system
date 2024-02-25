import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import PasswordReset from "./Components/PasswordReset";
import ForgotPassword from "./Components/ForgotPassword";
import Error from "./Components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./Components/ContextProvider/Context";

function App() {
  const [data, setData] = useState(false);
  const history = useNavigate();
  const { loginData, setLoginData } = useContext(LoginContext);
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
      console.log("Invalid User");
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
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route
              path="/forgotpassword/:id/:token"
              element={<ForgotPassword />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
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
}

export default App;
