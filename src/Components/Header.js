import React, { useEffect, useContext } from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

const handleClose = () => {
	setAnchorEl(null);
};

const handleClick = (event) => {
	setAnchorEl(event.currentTarget);
};
const goError =()=>{
  history("*");
}
const goDashboard =()=>{
  history("/dashboard");
}
const logOut = async() => {
   let token = localStorage.getItem("usersdatatoken");
        const res = await fetch(`${process.env.URL}/logout`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token,
                Accept : "application/json",
            },
            credentials:"include" // remove cookie
        });

        const data = await res.json();
        if(data.status == 201){
          localStorage.removeItem("usersdatatoken");
          setLoginData(false);
          history("/");
        }else{
          console.log("Error");
        }
}
  return (
    <>
      <header>
        <nav>
          <NavLink to="/"><h1>Login Authentication System</h1></NavLink>
          <div className="avtar">
            {loginData.validUser ? (<>
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {loginData.validUser.name[0].toUpperCase()}
              </Avatar>

              <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
	            >
                {
                    <>
                    <MenuItem onClick={()=>{
                      handleClose() 
                      goDashboard()
                    }}>Profile</MenuItem>

                    <MenuItem onClick={()=>{
                      handleClose() 
                      logOut()
                    }}>Logout</MenuItem>
                      
                    </>
                 
                }
	            </Menu>
            </>): 
              <Avatar style={{ background: "blue" }} onClick={handleClick}/>
            }
          </div>
          {/* <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
	        >
              {
                loginData.validUser ? (
                  <>
                  <MenuItem onClick={()=>{
                    handleClose() 
                    goDashboard()
                  }}>Profile</MenuItem>

                  <MenuItem onClick={()=>{
                    handleClose() 
                    logOut()
                  }}>Logout</MenuItem>
                    
                  </>
                ):(
                  <MenuItem onClick={()=>{
                    handleClose() 
                    goError()
                  }}>Profile</MenuItem>
                )
              }
	        </Menu> */}
        </nav>
      </header>
    </>
  );
};

export default Header;

