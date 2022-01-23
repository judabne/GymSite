import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Danger from "components/Typography/Danger";

import image from "assets/img/bg7.jpg";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { useDispatch, useSelector } from "react-redux";
import { detailsPlan } from "actions/plansActions";

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import Loader from "components/Loader/Loader";
const stripePromise = loadStripe("pk_test_51JiCwaBQcQnzL9cbRtyDblc4hlqXkJXA8T8D1e1u4p72VEIIEyITsKHhTfFwNXMhEVDsJh06PXUliftJs5CGyw3q00klWibzpP")

const useStyles = makeStyles(styles);

export default function PlansBuyPage(props) {
    const classes = useStyles();
    const { match, ...rest } = props;
    const id = match.params.id;

    const planDetails = useSelector(state => state.planDetails);
    const { plan, loading, error } = planDetails;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    const dispatch = useDispatch();
    console.log(plan);

    const [secretKey, setSecretKey] = useState('');

    useEffect(() => {
        dispatch(detailsPlan(id));
        const fetchSecretKey = async () => {
            const res = await axios.get('/api/secret/' + id,{
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            const clientSecret = res.data['client_secret'];
            setSecretKey(clientSecret);
        }
        fetchSecretKey();
        return () => {
            //
        };
    }, []);

    const options = {
        clientSecret: secretKey
    };

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
                    {console.log(options)}
                    <Card>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <h4>Buy {plan && plan.planName}</h4>
                                </CardHeader>
                            </GridItem>
                        </GridContainer>
                        <CardBody>
                            {loading ? <p className={classes.divider}><Loader /></p> :
                                error && <Danger style={{ textAlign: "center" }}>Error retrieving data</Danger>}
                        </CardBody>
                        {
                            secretKey &&
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm plan={plan} />
                            </Elements>
                        }
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
