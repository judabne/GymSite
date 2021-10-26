import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import { makeStyles } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Danger from 'components/Typography/Danger';

const useStyles = makeStyles(styles);

export default function CheckoutForm(props) {
    const classes = useStyles();
    const history = useHistory();

    const { plan } = props

    const stripe = useStripe();
    const elements = useElements();
    let waiting = false;

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        console.log('submitting payment');
        setErrorMessage(null)
        waiting = true;

        const domain = window.location.hostname;
        const redirect = 'http://' + domain + ':3000/paymentresult';

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: redirect,
            },
        });
        // ask mentor how to avoid the above return_url

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (e.g., payment
            // details incomplete)
            setErrorMessage(error.message);
            console.log(error.message)
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    let disabled;
    return (
        <form onSubmit={handleSubmit}>
            <CardBody>
                <h4>Purchase {plan.planName} for ${plan.planPrice}</h4>
                <PaymentElement />
                <Danger><h4>{errorMessage}</h4></Danger>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
                <Button simple color="warning" onClick={() => history.goBack()}>Go Back</Button>
                <Button type="submit" color="primary" disabled={!stripe || waiting}>Purchase {plan && "for $" + plan.planPrice}</Button>
                
                
            </CardFooter>
        </form>
    );
}