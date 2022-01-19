import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPlans, savePlan, deletePlan } from '../../../actions/plansActions';
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
import Button from "components/CustomButtons/Button.js";
import SneakingComponent from "../SneakingComponent/SneakingComponent"
// assets
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
import Danger from "components/Typography/Danger";
import PlanComponent from "./PlanComponent.js/PlanComponent";
import PlanEditComponent from "./PlanEditComponent/PlanEditComponent";

const useStyles = makeStyles(styles);

export default function PlansPage(props) {

    const classes = useStyles();
    const { ...rest } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [plan, setPlan] = useState();

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
    }
    const openModal = (plan) => {
        setPlan(plan);
        setModalVisible(true);
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
                                                    error ? <tr><td><Danger>Error retrieving data</Danger></td></tr> :
                                                        plans.map(plan => (
                                                            <PlanComponent
                                                                key={plan._id}
                                                                plan={plan}
                                                                onEditClick={() => openModal(plan)}
                                                                onDeleteClick={() => deleteHandler(plan)}
                                                            />
                                                        ))}
                                            </tbody>
                                        </table>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="button" simple size="lg" color="primary" onClick={() => openModal({})} disabled={modalVisible}>New Plan</Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* Create or update plan card */}
                            {modalVisible &&
                                <PlanEditComponent
                                    plan={plan}
                                    loadingSave={loadingSave}
                                    errorSave={errorSave}
                                    onCloseClick={() => closeModal()} />
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
