import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(styles);

export default function ActiveMembership(props) {
    const classes = useStyles();
    var todayDate = new Date();
    let remainingDays = Math.ceil((Date.parse(props.expiry) - todayDate) / (1000 * 3600 * 24))

    return (
        <div>
            < GridContainer >
                <GridItem xs={6} sm={6} md={6}>
                    <h5>{props.planType} Membership</h5>
                </GridItem>
                <GridItem xs={6} sm={6} md={6} className={classes.textRight}>
                    <h5>{remainingDays} day{remainingDays !== 1 && 's'} remaining</h5>
                </GridItem>
            </GridContainer>
            <Divider style={{ marginBottom: ".5rem" }} />
        </div>
    )
}