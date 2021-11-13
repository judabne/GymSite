import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core";
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Divider from "@material-ui/core/Divider";

console.log(styles)
const useStyles = makeStyles({styles});
console.log(useStyles)

interface Props {
    planType: any,
    expiry: any,
    classes?: object
};

function ActiveMembership(props: Props) {
    const classes = useStyles();
    console.log(classes)

    var todayDate: any = new Date();
    let remainingDays = Math.ceil((Date.parse(props.expiry) - todayDate) / (1000 * 3600 * 24))

    return (
        <div>
            <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                    <h5>{props.planType} Membership</h5>
                </Grid>
                {/* the line below should use className={classes.textRight} instead of this */}
                <Grid item xs={6} sm={6} md={6} style={{textAlign: "right"}}>
                    <h5>{remainingDays} day{remainingDays !== 1 && 's'} remaining</h5>
                </Grid>
            </Grid>
            <Divider style={{ marginBottom: ".5rem" }} />
        </div>
    )
}

export default ActiveMembership;