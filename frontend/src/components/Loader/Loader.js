import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from './loaderStyle';

const useStyles = makeStyles(styles);

export default function Loader() {
    const classes = useStyles();
    console.log(classes.ldsGrid)
    return (
        <div className={classes.ldsGrid}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}