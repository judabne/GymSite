import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
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
                    {/* */}
                    <Card className={classes[cardAnimaton] + "fullWidth"}>
                        <form className={classes.form}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={4}>
                                    {/* did this to keep the centered styling as in login page, while allowing the body to go wide */}
                                    <CardHeader color="info" className={classes.cardHeader}>
                                        <h4>Work with us</h4>
                                    </CardHeader>
                                </GridItem>
                            </GridContainer>
                            <CardBody>
                                <form>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Your Name"
                                                id="name"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                underlineInfo
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Your Email"
                                                id="email"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                underlineInfo
                                            />
                                        </GridItem>
                                        <CustomInput
                                            labelText="Your Message"
                                            id="message"
                                            formControlProps={{
                                                fullWidth: true,
                                                className: classes.textArea,
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 5,
                                            }}
                                            underlineInfo
                                        />
                                    </GridContainer>
                                </form>
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button simple color="info" size="lg">
                                    Submit your application
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
