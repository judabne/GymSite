import React, { useEffect, useState } from "react";
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
import checkboxstyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

import image from "assets/img/bg7.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listPlans } from '../../../actions/plansActions';
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";

const useStyles = makeStyles(styles);
const cbStyles = makeStyles(checkboxstyles);

export default function PlansPage(props) {

    const classes = useStyles();
    const cbclasses = cbStyles();
    const { ...rest } = props;


    const [name, setName] = useState('');
    const [duration, setDuration] = useState(1);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    const plansList = useSelector(state => state.plansList);
    const { loading, plans, error } = plansList;
    const dispatch = useDispatch();

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 200);

    useEffect(() => {
        dispatch(listPlans())
        console.log(plans);
        return () => {
            //
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePlan({ name, duration, type, description, price, availability }));
    }

    return (

        <div>
            {userInfo && userInfo.isAdmin ?
                <>
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
                            {
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card className={classes[cardAnimaton]}>
                                            <form onSubmit={submitHandler} className={classes.form}>
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CardHeader color="primary" className={classes.cardHeader}>
                                                            <h4>Plan Details</h4>
                                                        </CardHeader>
                                                    </GridItem>
                                                </GridContainer>
                                                {loading && <p className={classes.divider}>Loading...</p>}
                                                {error && <p className={classes.divider}><Danger>Error Signing in</Danger></p>}
                                                <CardBody>
                                                    <GridContainer>
                                                        <GridItem xs={12} sm={6} md={6}>
                                                            <CustomInput
                                                                labelText="Plan Name"
                                                                id="name"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    onChange: (e) => setName(e.target.value)
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={6} md={6}>
                                                            <CustomInput
                                                                labelText="Plan Type"
                                                                id="type"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    onChange: (e) => setType(e.target.value)
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <CustomInput
                                                                labelText="Description"
                                                                id="description"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    onChange: (e) => setDescription(e.target.value),
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={6} md={6}>
                                                            <CustomInput
                                                                labelText="Duration (months)"
                                                                id="duration"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "number",
                                                                    inputProps: {
                                                                        min: 1,
                                                                        max: 3,
                                                                    },
                                                                    onChange: (e) => setDuration(e.target.value)
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={6} md={6}>
                                                            <CustomInput
                                                                labelText="Price (USD)"
                                                                id="price"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "number",
                                                                    inputProps: {
                                                                        min: 5,
                                                                    },
                                                                    onChange: (e) => setPrice(e.target.value)
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <FormControlLabel
                                                                style={{ position: "absolute", right: "0px" }}
                                                                control={
                                                                    <Checkbox
                                                                        tabIndex={-1}
                                                                        // onClick={() => handleToggle(21)}
                                                                        checkedIcon={<Check className={cbclasses.checkedIcon} />}
                                                                        icon={<Check className={cbclasses.uncheckedIcon} />}
                                                                        classes={{ checked: cbclasses.checked }}
                                                                    />
                                                                }
                                                                classes={{ label: classes.label }}
                                                                label="Active plan"
                                                            />

                                                        </GridItem>
                                                        {/* <div class="togglebutton">
                                                            <label>
                                                                <input type="checkbox" checked="">
                                                                Toggle is on
                                                            </label>
                                                        </div> */}
                                                    </GridContainer>
                                                </CardBody>
                                            </form>
                                            <CardFooter className={classes.cardFooter}>
                                                <Button type="submit" simple color="primary" size="lg">
                                                    Create Plan
                                                </Button>
                                            </CardFooter>

                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            }
                            {/* */}
                            <Card>
                                <form className={classes.form}>
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={11}>
                                            {/* did this to keep the centered styling as in login page, while allowing the body to go wide */}
                                            <CardHeader color="primary" className={classes.cardHeader}>
                                                <h4>Plans Managmenet</h4>
                                            </CardHeader>
                                        </GridItem>
                                    </GridContainer>
                                    <CardBody>
                                            <table className="table" style={{width: "100%"}}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        {window.innerWidth >= 768 ?
                                                            <>
                                                                <th>Description</th>
                                                                <th>Duration</th>
                                                                <th>Type</th>
                                                                <th>Price</th>
                                                                <th>Availability</th>
                                                            </>
                                                            : null}
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {plans.map(plan => (<tr key={plan._id}>
                                                        <td>{plan.planName}</td>
                                                        {window.innerWidth >= 768 ?
                                                            <>
                                                                <td>{plan.planDescription}</td>
                                                                <td>{plan.planDuration}</td>
                                                                <td>{plan.planType}</td>
                                                                <td>{plan.planPrice}</td>
                                                                <td>{plan.planAvailable.toString()}</td>
                                                            </>
                                                            : null}
                                                        <td>
                                                            <button className="button">Edit</button>
                                                            {' '}
                                                            <button className="button">Delete</button>
                                                        </td>
                                                    </tr>))}
                                                </tbody>
                                            </table>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                    </CardFooter>
                                </form>
                            </Card>
                        </div>
                        <Footer whiteFont />
                    </div>
                </>
                : <div>
                    This type of sneaking is not allowed
                    <br />
                    <img src="https://c.tenor.com/hcm5oQtYQ2AAAAAC/sneaky-sneaky-mom.gif" />
                    <br />
                    <Link to="/">Get out of here</Link>
                </div>
            }
        </div>
    );
}
