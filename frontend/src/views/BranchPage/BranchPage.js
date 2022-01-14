import React, { useEffect } from "react";
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
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { detailsBranch } from "actions/branchesActions";
import { useDispatch, useSelector } from "react-redux";
import Danger from "components/Typography/Danger";

const useStyles = makeStyles(styles);

export default function BranchPage(props) {

    const classes = useStyles();
    const { match, ...rest } = props;
    const id = match.params.id;
    const branchDetails = useSelector(state => state.branchDetails);
    const { branch, loading, error } = branchDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsBranch(id));
        return () => {
            //
        };
    }, []);

    console.log(branch)

    return (
        <div>
            <Header
                absolute
                color="transparent"
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
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card justify="center">
                                {loading ? <GridContainer justify="center"><h5>Please wait while we load the branch</h5></GridContainer> :
                                    error ? <GridContainer justify="center">Can't retrieve branch info at the moment. Please try again in a bit.</GridContainer> :
                                        <>
                                            <CardHeader color="success" className={classes.cardHeader}>
                                                <h4>{branch.branchCity}</h4>
                                            </CardHeader>
                                            <CardBody>
                                                <h5>{branch.branchDescription}</h5>
                                            </CardBody>
                                            <CardFooter className={classes.cardFooter}>
                                                <Button simple color="success" size="lg">
                                                    Go there
                                                </Button>
                                            </CardFooter>
                                        </>
                                }
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
