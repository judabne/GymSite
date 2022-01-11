import React from "react";
// core components
import Button from "components/CustomButtons/Button.js";

export default function PlanComponent({ plan, onEditClick, onDeleteClick }) {
    return (
        <tr key={plan._id}>
            <td>{plan.planName}</td>
            {window.innerWidth >= 768 ?
                <>
                    <td>{plan.planType}</td>
                    <td>{plan.planDescription}</td>
                    <td>{plan.planDuration}</td>
                    <td>{plan.planPrice}</td>
                    <td>{plan.planAvailable.toString()}</td>
                </>
                : null}
            <td>
                <Button size="sm" type="button" color="success" onClick={onEditClick}>
                    Edit
                </Button>
                <Button size="sm" type="button" color="danger" onClick={onDeleteClick}>
                    Delete
                </Button>
            </td>
        </tr>
    )
}