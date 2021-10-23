import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
import { useDispatch, useSelector } from "react-redux";
import Danger from "components/Typography/Danger";
import { detailsPlan } from "actions/plansActions";

// Stripe
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51JiCwaBQcQnzL9cbRtyDblc4hlqXkJXA8T8D1e1u4p72VEIIEyITsKHhTfFwNXMhEVDsJh06PXUliftJs5CGyw3q00klWibzpP")

const useStyles = makeStyles(styles);

export default function PlansBuyPage(props) {
    const history = useHistory();
    const classes = useStyles();
    const { match, ...rest } = props;
    const id = match.params.id;

    const planDetails = useSelector(state => state.planDetails);
    const { plan, loading, error } = planDetails;
    const dispatch = useDispatch();
    console.log(plan);

    const [secretKey, setSecretKey] = useState('');

    useEffect(() => {
        dispatch(detailsPlan(id));
        const fetchSecretKey = async () => {
            const res = await axios.get('/api/secret/' + id);
            const clientSecret = res.data['client_secret'];
            console.log(clientSecret)
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
                        {secretKey &&
                            <Elements stripe={stripePromise} options={options}>
                                <form>
                                    <CardBody>
                                        {loading ? <p className={classes.divider}>Loading...</p> :
                                            error ? <Danger>Error retrieving data</Danger> :
                                                <>
                                                    <h4>Purchase {plan.planName} for ${plan.planPrice}</h4>
                                                    <PaymentElement />
                                                </>
                                        }
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="warning" onClick={() => history.goBack()}>Go Back</Button>
                                        <Button color="primary">Purchase {plan && "for $" + plan.planPrice}</Button>
                                    </CardFooter>
                                </form>
                            </Elements>
                        }
                    </Card>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
