import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import profile from "assets/img/dumbbells.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function Page(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  var description;
  var todayDate = new Date();
  description = userInfo.isAdmin
    ? "Who cares about your subscription? You're the admin!"
    : userInfo.expiry > todayDate
      ? "Your membership is active"
      : "Your membership is not active currently"

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    }
    return () => {

    };
  }, [userInfo]);

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("assets/img/bg7.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userInfo.firstName + " " + userInfo.lastName}</h3>
                    {userInfo.isAdmin && <h6> Admin Account </h6>}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                {description}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Link to="/purchase"><Button type="button" color="primary" size="lg">Purchase membership</Button></Link>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}
