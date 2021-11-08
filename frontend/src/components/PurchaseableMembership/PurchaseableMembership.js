import React from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import { cardTitle, cardLink, cardSubtitle } from "assets/jss/material-kit-react.js";

const cardStyles = {
    cardTitle,
    cardLink,
    cardSubtitle,
    textRight: {
        textAlign: "right"
    }
};

const useCardStyles = makeStyles(cardStyles);

export default function PurchaseableMembership(props) {
    const cardClasses = useCardStyles();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const {plan} = props; 

    let oneYearFromToday = new Date();
    oneYearFromToday = oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1);

    function planExpiresBefore1Year(planDate, oneYearFromToday, duration) {
        let endDate = planDate
        endDate.setMonth(endDate.getMonth() + duration);
        return endDate <= oneYearFromToday ? true : false
    }

    function purchaseButtonDisabled(plan) {
        if (!userInfo) return true;
        const searchPlan = userInfo.plans.find(subsc => subsc.planType === plan.planType);
        if (!searchPlan) return false;
        return !planExpiresBefore1Year(new Date(searchPlan.expiry), oneYearFromToday, plan.planDuration)
    }

    return (
        <GridItem xs={12} sm={6} md={4}>
            <Card>
                <CardBody>
                    <h4 className={cardClasses.cardTitle}>{plan.planName}</h4>
                    <h6 className={cardClasses.cardSubtitle}>{plan.planType}</h6>
                    <p>
                        {plan.planDescription}
                    </p>
                    <div className={cardClasses.textRight}>
                        <h3 className={cardClasses.cardTitle}>${plan.planPrice}</h3>
                        {/* This was wrapped in a link. But we can't disable links */}
                        <Button color="primary" href={"/purchase/" + plan._id}
                            disabled={purchaseButtonDisabled(plan)}
                        >Purchase</Button>
                    </div>
                </CardBody>
            </Card>
        </GridItem>
    )
}