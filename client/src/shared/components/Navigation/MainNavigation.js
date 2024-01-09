import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElement/Backdrop";

const MainNavigation = () => {
  const [drawrIsOpen, setDrawerIsOpen] = useState(false);

  const drawerHandler = () => {
    setDrawerIsOpen(!drawrIsOpen);
  };

  return (
    <>
      {drawrIsOpen && <Backdrop onClick={drawerHandler} />}

      <SideDrawer show={drawrIsOpen} onClick={drawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={drawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">내 장소</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
