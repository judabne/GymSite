import React from "react";
// @material-ui/core components
import { Grid } from "@material-ui/core";
// core components
import Divider from "@material-ui/core/Divider";

interface Keyable {
    [key: string]: string
}

interface Props {
    planType: string,
    expiry: string,
    classes: Keyable
};

const ActiveMembership: React.FC<Props> = (props) => {
    var todayDate: any = new Date();
    let remainingDays = Math.ceil((Date.parse(props.expiry) - todayDate) / (1000 * 3600 * 24))

    return (
        <div>
            <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                    <h5>{props.planType} Membership</h5>
                </Grid>
                {/* the line below should use className={classes.textRight} instead of this */}
                <Grid item xs={6} sm={6} md={6} className={props.classes.textRight}>

                    <h5>{remainingDays} day{remainingDays !== 1 && 's'} remaining</h5>
                </Grid>
            </Grid>
            <Divider style={{ marginBottom: ".5rem" }} />
        </div>
    )
}

export default ActiveMembership;