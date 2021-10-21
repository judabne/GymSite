/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Cookies from "js-cookie";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin
  const classes = useStyles();

  // need to re-render this component after signing out/in
  const logoutHandler = () => {
    //console.log(login);
    console.log("signing out");
    Cookies.remove('userInfo');
    //couldn't refresh using useState
    location.reload();
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {
          userInfo ? // user signed in
            <CustomDropdown
              noLiPadding
              buttonText={userInfo.firstName}
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
                <Link to="/account" className={classes.dropdownLink}>
                  My Account
                </Link>,
                <a
                  onClick={() => logoutHandler()}
                  className={classes.dropdownLink}
                >
                  Logout
                </a>,
              ]}
            />
            : // user not signed in
            <CustomDropdown
              noLiPadding
              buttonText="Sign In"
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
                <Link to="/login" className={classes.dropdownLink}>
                  Login
                </Link>,
                <a
                  href="/register"
                  className={classes.dropdownLink}
                >
                  Register
                </a>,
              ]}
            />
        }
      </ListItem>

      {
        userInfo && userInfo.isAdmin ?
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText="Admin Tools"
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
                <Link to="/admin/plans" className={classes.dropdownLink}>
                  Manage Plans
                </Link>,
                <Link to="/admin/branches" className={classes.dropdownLink}>
                  Manage Branches
                </Link>,
                <Link to="/admin/users" className={classes.dropdownLink}>
                  Manage Users
                </Link>,
              ]}
            />
          </ListItem>
          : null
      }
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/components" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        />
      </ListItem>
    </List>
  );
}
