import React from "react";
// core components
import Button from "components/CustomButtons/Button.js";

export default function BranchComponent({branch, onEditClick, onDeleteClick}) {
    // const {branch} = props; 
    return (
        <tr>
            <td>{branch.branchCity}</td>
            {window.innerWidth >= 768 ?
                <>
                    <td>{branch.branchDescription}</td>
                    <td><img src={branch.branchImage} style={{ width: "5vw" }}></img></td>
                </>
                : null}
            <td style={{ width: "15vw" }}>
                <Button size="sm" type="button" color="success" onClick = {onEditClick}>
                    Edit
                </Button>
                <Button size="sm" type="button" color="danger" onClick = {onDeleteClick}>
                    Delete
                </Button>
            </td>
        </tr>
    ) 
}