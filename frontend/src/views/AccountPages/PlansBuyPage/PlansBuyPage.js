import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activePlans } from "actions/plansActions";
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
import Danger from "components/Typography/Danger";
import Primary from "components/Typography/Primary";

import image from "assets/img/bg7.jpg";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import PurchaseableMembership from "components/PurchaseableMembership/PurchaseableMembership";

const useStyles = makeStyles(styles);

export default function PlanBuyPage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    const planActive = useSelector(state => state.planActive);
    const { loading, plans, error } = planActive;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
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
                            <Primary><h5>You can purchase memberships up to a year ahead</h5></Primary>
                            {loading ? <p className={classes.divider}>Loading...</p> :
                                error ? <Danger>Error retrieving data</Danger> :
                                    <GridContainer justify="left">
                                        {plans.map(plan =>
                                            <PurchaseableMembership key={plan._id} plan={plan} />
                                        )}
                                    </GridContainer>
                            }
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            {!userInfo && <Link to="/login"><Danger><h4>Please sign in to purchase a plan</h4></Danger></Link>}
                        </CardFooter>
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
