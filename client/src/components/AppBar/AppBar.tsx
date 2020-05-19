/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {isAuthenticated} from '../../store/auth';
import actions from '../../store/actions';
import {AppBarElement} from './AppBarElement';
import logo from '../../logo.png';

// import AppSearch from "./AppSearch"

export const AppBar = () => {
  const isSignIn = useSelector((state: RootState) => isAuthenticated(state));
  const amount = useSelector((state: RootState) => state.near.amount);

  const dispatch = useDispatch();

  const onLogout = () => dispatch(actions.auth.logout());

  const authetificatedMenu = (
    <>
      <AppBarElement title="My contracts" to="/contracts" key="contracts" />
      <AppBarElement title="Templates" to="/templates" key="bonds" />
      <AppBarElement title="Partners" to="/partners" key="companies" />
    </>
  );

  const authRightMenu = (
    <div className="navbar-right">
      <NavDropdown title="Account" id="basic-nav-dropdown" alignRight>
        <NavDropdown.Item key={'amount'}>
            Amount: {amount}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={onLogout} key={'logout'}>
          <i data-feather="log-out" />
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );

  const nonAutheticatedMenu = (
    <div className="navbar-right">
      <Navbar id="basic-navbar-nav" className={'nav-link'}>
        <Nav variant={'pills'}>
          <Nav key={3.1}>
            <Link to={'/login'}>SIGN IN</Link>
          </Nav>
        </Nav>
      </Navbar>
    </div>
  );

  return (
    <Navbar className="navbar-header navbar-header-fixed">
      <a href="#" id="mainMenuOpen" className="burger-menu">
        <i data-feather="menu" />
      </a>
      <Navbar.Brand>
        <Link to="/" className="df-logo">
          <img src={logo} height={35} alt={'Logo'} />
        </Link>
      </Navbar.Brand>
      <div id="navbarMenu" className="navbar-menu-wrapper">
        <div className="navbar-menu-header">
          <Link to="/" className="df-logo">
            TZ<span>factor</span>
          </Link>
          <a id="mainMenuClose" href="#">
            <i data-feather="x" />
          </a>
        </div>
        <Nav className="navbar-menu" style={{justifyContent: 'center'}}>
          {isSignIn ? authetificatedMenu : ''}
        </Nav>
        {isSignIn ? authRightMenu : nonAutheticatedMenu}
      </div>
    </Navbar>
  );
};

export default AppBar;
