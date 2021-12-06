import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reloadUser } from "actions/userActions";
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

import image from "assets/img/bg7.jpg";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import CardFooter from "components/Card/CardFooter";
import { Link } from "react-router-dom";


const useStyles = makeStyles(styles);

export default function PlansBuyPage(props) {
    const classes = useStyles();
    const { match, ...rest } = props;

    const [statusCode, setStatusCode] = useState('');
    const [response, setResponse] = useState({});

    const search = useLocation().search;
    const payment_intent = new URLSearchParams(search).get('payment_intent');
    console.log(payment_intent)

    const dispatch = useDispatch();

    useEffect(() => {
        const processIntent = async () => {
            const res = await axios.put('/api/payment/' + payment_intent, {
            });
            setStatusCode(res.status);
            setResponse(res.data);
            dispatch(reloadUser());
        }
        processIntent();
        return () => {
            //
        };
    }, []);

    return (
        <div>
            {console.log(statusCode)}
            {console.log(response)}
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
                                    <h4>Payment Result</h4>
                                </CardHeader>
                            </GridItem>
                        </GridContainer>
                        <CardBody className={classes.divider}>
                            <h3 >Receipt No: {payment_intent}</h3>
                            <h4>
                                {response.message
                                    ? response.message
                                    : response.paymentPlanType && "Your " + response.paymentPlanType + " membership purchase was successful."
                                } Please keep the receipt number for future reference.
                            </h4>
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            {/* using <a> instead of <Link> because I want it to reload and use the new cookie */}
                            <a href="/account">Back to account</a>
                        </CardFooter>
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
