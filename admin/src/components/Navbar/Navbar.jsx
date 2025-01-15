import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo animated-logo" src={assets.logo} alt="Logo" />
      <img className="profile animated-profile" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;
