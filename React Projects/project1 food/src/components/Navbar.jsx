import React from 'react'
import "../style/Navbar.css"

const Navbar = ({setIsCartOpen}) => {
  return (
    <>
    <header className="navbar">
      <div className="logo">LOGO</div>
      <nav className="nav-links">
        <a onClick={() => {
          setIsCartOpen(false)
        }}>Home</a>
        <a onClick={() => {
          setIsCartOpen(true)       
        }}>Cart</a>
      </nav>
      <button className="login-btn">Login</button>
    </header>
    </>
  );
}

export default Navbar

