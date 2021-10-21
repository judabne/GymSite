import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listPlans, savePlan, deletePlan } from '../../../actions/plansActions';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
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
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";
// assets
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import checkboxstyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import image from "assets/img/bg7.jpg";
import Danger from "components/Typography/Danger";

const useStyles = makeStyles(styles);
const cbStyles = makeStyles(checkboxstyles);

export default function PlansPage(props) {

    const classes = useStyles();
    const cbclasses = cbStyles();
    const { ...rest } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(false);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    const plansList = useSelector(state => state.plansList);
    const { loading, plans, error } = plansList;
    const planSave = useSelector(state => state.planSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = planSave;
    const planDelete = useSelector(state => state.planDelete);
    const { success: successDelete } = planDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listPlans());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const closeModal = () => {
        setModalVisible(false);
        setId(''); // if we discard an edited plan and create a new one, we get old fields but new id
    }
    const openModal = (plan) => {
        setModalVisible(true);
        setId(plan._id);
        setName(plan.planName);
        setDuration(plan.planDuration);
        setType(plan.planType);
        setDescription(plan.planDescription);
        setPrice(plan.planPrice);
        setAvailability(plan.planAvailable);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePlan({
            _id: id,
            name, duration, type, description, price, availability
        }))
    }

    const deleteHandler = (plan) => {
        dispatch(deletePlan(plan._id));
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
                                        <table className="table" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    {window.innerWidth >= 768 ?
                                                        <>
                                                            <th>Type</th>
                                                            <th>Description</th>
                                                            <th>Duration</th>
                                                            <th>Price</th>
                                                            <th>Availability</th>
                                                        </>
                                                        : null}
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? <tr className={classes.divider}><td>Loading...</td></tr> :
                                                error ? <tr><td><Danger>Error retrieving data</Danger></td></tr>:
                                                plans.map(plan => (<tr key={plan._id}>
                                                    <td>{plan.planName}</td>
                                                    {window.innerWidth >= 768 ?
                                                        <>
                                                            <td>{plan.planType}</td>
                                                            <td>{plan.planDescription}</td>
                                                            <td>{plan.planDuration}</td>
                                                            <td>{plan.planPrice}</td>
                                                            <td>{plan.planAvailable.toString()}</td>
                                                        </>
                                                        : null}
                                                    <td>
                                                        <Button size="sm" type="button" color="success" onClick={() => openModal(plan)}>
                                                            Edit
                                                        </Button>
                                                        <Button size="sm" type="button" color="danger" onClick={() => deleteHandler(plan)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>))}
                                            </tbody>
                                        </table>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="button" simple size="lg" color="primary" onClick={() => openModal({})}>New Plan</Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* Create or update plan card */}
                            {modalVisible &&
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card>
                                            <form onSubmit={submitHandler} className={classes.form}>
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
                                                        <CardHeader color="primary" className={classes.cardHeader}>
                                                            <h4>Plan Details</h4>
                                                        </CardHeader>
                                                    </GridItem>
                                                </GridContainer>
                                                {loadingSave && <p className={classes.divider}>Loading...</p>}
                                                {errorSave && <p className={classes.divider}><Danger>Error saving info. Please validate the fields and try again later</Danger></p>}
                                                <CardBody>
                                                    <GridContainer>
                                                        <GridItem xs={12} sm={6} md={3}>
                                                            <CustomInput
                                                                labelText="Plan Name"
                                                                id="name"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    value: name,
                                                                    onChange: (e) => setName(e.target.value),
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={6} md={3}>
                                                            <CustomInput
                                                                labelText="Plan Type"
                                                                id="type"
                                                                formControlProps={{
                                                                    fullWidth: true,
                                                                }}
                                                                inputProps={{
                                                                    type: "text",
                                                                    value: type,
                                                                    onChange: (e) => setType(e.target.value)
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={6} md={3}>
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
                                                                        max: 12,
                                                                    },
                                                                    value: duration,
                                                                    onChange: (e) => setDuration(e.target.value)
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={6} md={3}>
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
                                                                    value: price,
                                                                    onChange: (e) => setPrice(e.target.value)
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
                                                                    value: description,
                                                                    onChange: (e) => setDescription(e.target.value),
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <FormControlLabel
                                                                style={{ position: "absolute", right: "0px" }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={availability}
                                                                        tabIndex={-1}
                                                                        onClick={() => setAvailability(!availability)}
                                                                        checkedIcon={<Check className={cbclasses.checkedIcon} />}
                                                                        icon={<Check className={cbclasses.uncheckedIcon} />}
                                                                        classes={{ checked: cbclasses.checked }}
                                                                    />
                                                                }
                                                                classes={{ label: classes.label }}
                                                                label="Active plan"
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                </CardBody>
                                                <CardFooter className={classes.cardFooter}>
                                                    <Button simple color="warning" size="lg" onClick={() => closeModal()}>
                                                        Discard
                                                    </Button>
                                                    <Button simple color="primary" size="lg" type="submit">{id ? "Update" : "Create"} Plan</Button>
                                                </CardFooter>
                                            </form>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            }
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
        </div >
    );
}
