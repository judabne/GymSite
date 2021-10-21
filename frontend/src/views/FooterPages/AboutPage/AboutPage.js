import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function AboutPage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                }}
            >
                <div className={classes.container}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={4}>
                                    {/* did this to keep the centered styling as in login page, while allowing the body to go wide */}
                                    <CardHeader color="warning" className={classes.cardHeader}>
                                        <h4>About Us</h4>
                                    </CardHeader>
                                </GridItem>
                            </GridContainer>
                            <CardBody>
                                <form>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <h2>
                                                Our Story
                                            </h2>
                                            <h4 align="justify">
                                                My Gym was founded in 2015 as a small business. The Gym founders didn’t want it to be just
                                                another place for working out - they wanted to offer a fun experience and set their minds
                                                to doing so! Since its birth. My Gym has grown into one of Lebanon’s largest gym chains
                                                having helped over 10,000 customers live longer, happier and healthier lives.
                                            </h4>
                                        </GridItem>
                                    </GridContainer>
                                </form>
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
