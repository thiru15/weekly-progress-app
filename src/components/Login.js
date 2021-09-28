
import weeklyprogress from "../assets/weeklyprogress.svg";
import {
  Button
} from "reactstrap";
import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  return (
  <div className="d-flex justify-content-around align-items-center" style={{height: "100%"}} >
    
        
  
    {!isAuthenticated && (
    <img className="app-logo" src={weeklyprogress} alt="Progress logo"  />)}
    
    {!isAuthenticated && (
      <div  className="d-flex justify-content-center align-items-center flex-column">
        <h1 style={{color: "#4166f5",marginBottom:"60px"}}> Weekly Progress App</h1>
      <Button style={{width: "200px"}} variant="primary" size="lg" id="qsLoginBtn"
      color="primary"
      className="btn-margin"
      onClick={() => loginWithRedirect()} >
      Log in
    </Button>
    </div>          
      )}
  </div>
  )
}

export default Hero;
