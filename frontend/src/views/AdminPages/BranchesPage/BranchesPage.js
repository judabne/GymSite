import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBranches, saveBranch, deleteBranch } from '../../../actions/branchesActions';
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
import SneakingComponent from "../SneakingComponent/SneakingComponent"
// assets
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import checkboxstyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import bgimage from "assets/img/bg7.jpg";
import Danger from "components/Typography/Danger";
import BranchComponent from "./BranchComponent/BranchComponent";

const useStyles = makeStyles(styles);
const cbStyles = makeStyles(checkboxstyles);

export default function BranchesPage(props) {

    const classes = useStyles();
    const { ...rest } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    const branchesList = useSelector(state => state.branchesList);
    const { loading, branches, error } = branchesList;
    const branchSave = useSelector(state => state.branchSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = branchSave;
    const branchDelete = useSelector(state => state.branchDelete);
    const { success: successDelete } = branchDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listBranches());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const closeModal = () => {
        setModalVisible(false);
        setId(''); // if we discard an edited branch and create a new one, we get old fields but new id
    }
    const openModal = (branch) => {
        console.log("EDITING BRANCH" + branch._id)
        setModalVisible(true);
        setId(branch._id);
        setCity(branch.branchCity);
        setDescription(branch.branchDescription);
        setImage(branch.branchImage);
        setLongitude(branch.branchLocation && branch.branchLocation.coordinates[0]);
        setLatitude(branch.branchLocation && branch.branchLocation.coordinates[1]);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveBranch({
            _id: id,
            city, description, image, longitude, latitude
        }))
    }

    const deleteHandler = (branch) => {
        console.log("Deleteing Branch " + branch._id)
        dispatch(deleteBranch(branch._id));
    }

    console.log("Branches component")

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
                            backgroundImage: "url(" + bgimage + ")",
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
                                                <h4>Branches Managmenet</h4>
                                            </CardHeader>
                                        </GridItem>
                                    </GridContainer>
                                    <CardBody>
                                        <table className="table" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Location</th>
                                                    {window.innerWidth >= 768 ?
                                                        <>
                                                            <th>Description</th>
                                                            <th>Image</th>
                                                        </>
                                                        : null}
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? <tr className={classes.divider}><td>Loading...</td></tr> :
                                                    error ? <tr><td><Danger>Error retrieving data</Danger></td></tr> :
                                                        branches.map(branch => (
                                                            <BranchComponent
                                                                key={branch._id}
                                                                branch={branch}
                                                                onEditClick={() => openModal(branch)}
                                                                onDeleteClick={() => deleteHandler(branch)} />
                                                        ))}
                                            </tbody>
                                        </table>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="button" simple size="lg" color="primary" onClick={() => openModal({})}>New Branch</Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* Create or update branch card */}
                            {modalVisible &&
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
                                                    <Button simple color="warning" size="lg" onClick={() => closeModal()}>
                                                        Discard
                                                    </Button>
                                                    <Button simple color="primary" size="lg" type="submit">{id ? "Update" : "Create"} Branch</Button>
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
                : <SneakingComponent />
            }
        </div >
    );
}
