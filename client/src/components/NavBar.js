import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    let user = props.user ? props.user : {status: "loggedout"}


    return (
        <nav className="navbar">
          <div className="navbar-left">
            <NavLink to="/" className="navbar-logo">Clé</NavLink>
          </div>

          <div className="nav-buttons">
            <NavLink to="/uploadProduct" className="nav-button">Upload Product</NavLink>
    
            {user.status === "loggedin" ? (
              <>
                <NavLink to={`/profile/${user.userInfo.username}`} className="nav-button">Profile</NavLink>
                <a href="/signout" className="nav-button" id="authbutton" role="button">Sign Out</a>
              </>
              ) : (
                <a href="/signin" className="nav-button" id="authbutton" role="button">Sign In</a>
              )}
          </div> 
        </nav>
    )
}

export default NavBar;