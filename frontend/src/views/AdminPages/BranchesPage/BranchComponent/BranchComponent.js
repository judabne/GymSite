import React from "react";
import Button from "components/CustomButtons/Button.js";
import classes from '../BranchesPage.module.css';

export default function BranchComponent({ branch, onEditClick, onDeleteClick }) {
    // const {branch} = props; 
    return (
        <tr>
            <td>{branch.branchCity}</td>
            <td className={classes.DesktopOnly}>{branch.branchDescription}</td>
            <td className={classes.DesktopOnly}><img src={branch.branchImage} style={{ width: "5vw" }}></img></td>
            <td style={{ width: "15vw" }}>
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