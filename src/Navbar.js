import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';

const Navbar = () => {
    return (
      <>
        <Nav>
          <Bars />
    
          <NavMenu>
            <NavLink to='/' activeStyle={{color:"black"}}>
              Purchase
            </NavLink>
            <NavLink to='/BuyToken' activeStyle={{color:"black"}}>
              Mint Token
            </NavLink>
            <NavLink to='/MintAccess' activeStyle={{color:"black"}}>
              Mint Access
            </NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  };
    
  export default Navbar;