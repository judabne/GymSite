import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import BranchesSection from "./Sections/BranchesSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/treadmills-background.jpg").default} className="fullHeight">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Tone your body with us.</h1>
              <h4>
                Everybody needs to take care of their body. With us, you can build,
                tone, and tweak your shape in a cool and friendly environment.
                Work out on your own, with your mates, or with our specialized coaches.
                Join our classes for a fun way to get fit.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=wkTFd3QZSP0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inquire More
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {/* <SectionCarousel /> */}
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <BranchesSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
