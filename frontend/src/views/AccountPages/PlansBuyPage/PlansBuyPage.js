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
import { Link } from "react-router-dom";
import { planDetailsReducer } from "reducers/plansReducers";

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
    const dispatch = useDispatch();

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
                                                            <Link to={"/purchase/" + plan._id}><Button color="primary">Purchase</Button></Link>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </GridItem>)}
                                    </GridContainer>
                            }
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                        </CardFooter>
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
