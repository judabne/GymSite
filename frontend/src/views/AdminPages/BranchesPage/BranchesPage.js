import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBranches, saveBranch, deleteBranch } from '../../../actions/branchesActions';
import { makeStyles } from "@material-ui/core/styles";
import cssClasses from "./BranchesPage.module.css";
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
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import bgimage from "assets/img/bg7.jpg";
import Danger from "components/Typography/Danger";
import BranchComponent from "./BranchComponent/BranchComponent";
import BranchEditComponent from "./BranchEditComponent/BranchEditComponent";
import Loader from "components/Loader/Loader";

const useStyles = makeStyles(styles);

export default function BranchesPage(props) {

    const classes = useStyles();
    const { ...rest } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [branch, setBranch] = useState();

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
    }
    const openModal = (branch) => {
        setBranch(branch);
        setModalVisible(true);
    }

    const deleteHandler = (branch) => {
        dispatch(deleteBranch(branch._id));
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
                                        {loading ? <div style={{ textAlign: "center" }}><Loader /></div> :
                                            error ? <div style={{ textAlign: "center" }}><Danger >Error retrieving data</Danger></div> :
                                                <table className="table" style={{ width: "100%" }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Location</th>
                                                            <th className={cssClasses.DesktopOnly}>Description</th>
                                                            <th className={cssClasses.DesktopOnly}>Image</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {branches.map(branch => (
                                                            <BranchComponent
                                                                key={branch._id}
                                                                branch={branch}
                                                                onEditClick={() => openModal(branch)}
                                                                onDeleteClick={() => deleteHandler(branch)} />
                                                        ))}
                                                    </tbody>
                                                </table>
                                        }
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="button" simple size="lg" color="primary" onClick={() => openModal()} disabled={modalVisible}>New Branch</Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* Create or update branch card */}
                            {modalVisible &&
                                <BranchEditComponent
                                    branch={branch}
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
