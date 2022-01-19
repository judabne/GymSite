import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveBranch } from '../../../../actions/branchesActions';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import Danger from "components/Typography/Danger";

const useStyles = makeStyles(styles);

export default function BranchEditComponent(props) {
    const classes = useStyles();
    const { branch, loadingSave, errorSave, onCloseClick, ...rest } = props;

    // const {branch} = props; 
    const [id, setId] = useState();
    const [city, setCity] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (branch) {
            setId(branch._id);
            setCity(branch.branchCity);
            setDescription(branch.branchDescription);
            setImage(branch.branchImage);
            setLongitude(branch.branchLocation && branch.branchLocation.coordinates[0]);
            setLatitude(branch.branchLocation && branch.branchLocation.coordinates[1]);
        }
    }, [branch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveBranch({
            _id: id,
            city, description, image, longitude, latitude
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
                        {loadingSave && <p className={classes.divider}>Loading...</p>}
                        {errorSave && <p className={classes.divider}><Danger>Error saving info. Please validate the fields and try again later</Danger></p>}
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={4}>
                                    <CustomInput
                                        labelText="Branch City"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            value: city,
                                            onChange: (e) => setCity(e.target.value),
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4}>
                                    <CustomInput
                                        labelText="Branch Description"
                                        id="description"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            value: description,
                                            onChange: (e) => setDescription(e.target.value)
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Image"
                                        id="image"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            value: image,
                                            onChange: (e) => setImage(e.target.value)
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Longitude (E/W)"
                                        id="longitude"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "number",
                                            value: longitude,
                                            onChange: (e) => setLongitude(e.target.value)
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Latitude (N/S)"
                                        id="latitude"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "number",
                                            value: latitude,
                                            onChange: (e) => setLatitude(e.target.value)
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button simple color="warning" size="lg" onClick={onCloseClick}>
                                Discard
                            </Button>
                            <Button simple color="primary" size="lg" type="submit">{id ? "Update" : "Create"} Branch</Button>
                        </CardFooter>
                    </form>
                </Card>
            </GridItem>
        </GridContainer>
    )
}