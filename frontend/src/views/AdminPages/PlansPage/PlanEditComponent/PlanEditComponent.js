import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlans, savePlan, deletePlan } from '../../../../actions/plansActions';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
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
import Danger from "components/Typography/Danger";
import Loader from "components/Loader/Loader";

const useStyles = makeStyles(styles);
const cbStyles = makeStyles(checkboxstyles);


export default function PlanEditComponent(props) {
    const classes = useStyles();
    const cbclasses = cbStyles();
    const { plan, loadingSave, errorSave, onCloseClick, ...rest } = props;

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [duration, setDuration] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [availability, setAvailability] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (plan) {
            setId(plan._id);
            setName(plan.planName);
            setDuration(plan.planDuration);
            setType(plan.planType);
            setDescription(plan.planDescription);
            setPrice(plan.planPrice);
            setAvailability(plan.planAvailable);
        }
    }, [plan]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePlan({
            _id: id,
            name, duration, type, description, price, availability
        }))
    }

    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <form onSubmit={submitHandler} className={classes.form}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <h4>Branch Details</h4>
                                </CardHeader>
                            </GridItem>
                        </GridContainer>
                        {loadingSave && <p className={classes.divider}><Loader /></p>}
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
                            <Button simple color="warning" size="lg" onClick={onCloseClick}>
                                Discard
                            </Button>
                            <Button simple color="primary" size="lg" type="submit">{id ? "Update" : "Create"} Plan</Button>
                        </CardFooter>
                    </form>
                </Card>
            </GridItem>
        </GridContainer>
    )
}