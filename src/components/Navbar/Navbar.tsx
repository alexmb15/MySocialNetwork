import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import SidebarContainer from "./Sidebar/SidebarContainer";



const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/Profile"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}> Profile
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Dialogs"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Messages
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/News"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>News
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Music"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Music
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/Users"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Find users
                </NavLink>
            </div>
            <div className={`${classes.item} ${classes.activeLink}`}>
                <NavLink to="/Settings"
                         className={navData => navData.isActive ? classes.activeLink : classes.item}>Settings
                </NavLink>
            </div>
            <div>
                <SidebarContainer />
            </div>
        </nav>
    );
}

export default Navbar;