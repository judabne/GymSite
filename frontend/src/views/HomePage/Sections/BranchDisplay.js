import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
const useStyles = makeStyles(styles);

export default function BranchDisplay({ branch }) {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgFluid,
        classes.imgRounded,
        classes.circularImg
    );
    const circular = classNames(
        classes.circular,
        classes.imgRaised,
    );

    return (
        <GridItem xs={12} sm={6} md={4} >
            <Card plain>
                <GridItem xs={12} sm={12} md={7} className={classes.itemGrid}>
                    <div className={circular}>
                        <img src={branch.branchImage} alt={branch.branchCity + " image"} className={imageClasses} />
                    </div>
                </GridItem>
                <h4 className={classes.cardTitle}>
                    {branch.branchCity}
                    <br />
                </h4>
                <CardBody>
                    <p className={classes.branchDescription}>
                        {branch.description}
                    </p>
                </CardBody>
                <CardFooter />
            </Card>
        </GridItem>
    )
}