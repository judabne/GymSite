import React, { useEffect } from "react";
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

import image from "assets/img/bg7.jpg";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { cardTitle, cardLink, cardSubtitle } from "assets/jss/material-kit-react.js";
import { useDispatch, useSelector } from "react-redux";
import { activePlans } from "actions/plansActions";
import Danger from "components/Typography/Danger";
import Primary from "components/Typography/Primary";

const cardStyles = {
    cardTitle,
    cardLink,
    cardSubtitle,
    textRight: {
        textAlign: "right"
    }
};

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(cardStyles);

export default function PlanBuyPage(props) {
    const classes = useStyles();
    const cardClasses = useCardStyles();
    const { ...rest } = props;

    const planActive = useSelector(state => state.planActive);
    const { loading, plans, error } = planActive;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    let yearDate = new Date();
    yearDate = yearDate.setFullYear(yearDate.getFullYear() + 1);
    console.log(yearDate);
    let planDate;

    function checkDate(planDate, yearDate, duration) {
        planDate.setMonth(planDate.getMonth() + duration);
        return planDate <= yearDate ? true : false
    }

    useEffect(() => {
        dispatch(activePlans());
        return () => {
            //
        };
    }, []);

    console.log(plans)
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
                    <Card>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <h4>Buy a plan</h4>
                                </CardHeader>
                            </GridItem>
                        </GridContainer>
                        <CardBody>
                            <Primary><h5>You can purchase memberships up to a year ahead</h5></Primary>
                            {loading ? <p className={classes.divider}>Loading...</p> :
                                error ? <Danger>Error retrieving data</Danger> :
                                    <GridContainer justify="left">
                                        {plans.map(plan =>

                                            <GridItem xs={12} sm={6} md={4} key={plan._id}>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className={cardClasses.cardTitle}>{plan.planName}</h4>
                                                        <h6 className={cardClasses.cardSubtitle}>{plan.planType}</h6>
                                                        <p>
                                                            {plan.planDescription}
                                                        </p>
                                                        <div className={cardClasses.textRight}>
                                                            <h3 className={cardClasses.cardTitle}>${plan.planPrice}</h3>
                                                            {/* This was wrapped in a link. But we can't disable links */}
                                                            <Button color="primary" href={"/purchase/" + plan._id}
                                                                disabled={!userInfo || !checkDate(new Date(userInfo.plans.find(subsc => subsc.planType === plan.planType).expiry), yearDate, plan.planDuration)}
                                                            >Purchase</Button>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>)}
                                    </GridContainer>
                            }
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            {!userInfo && <Danger><h4>Please sign in to purchase a plan</h4></Danger>}
                        </CardFooter>
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
