import React, { useEffect, useState } from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import BranchDisplay from "./BranchDisplay";

const useStyles = makeStyles(styles);

export default function BranchesSection() {
  const classes = useStyles();

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/branches");
      setBranches(data);
    }
    fetchData();
    return () => {
      //cleanup
    };
  }, [])
  return (

    <div className={classes.section}>

      <h2 className={classes.title}>Our Branches... All over the place</h2>
      <h5 className={classes.description}>
        Whether you{"'"}re working, finalizing official documents at the capital,
        preparing for a beach party, chilling in the mountains, or
        relaxing at your hometown, you will find a branch near you.
      </h5>
      <div>
        <GridContainer>
          {
            branches.map(branch => <BranchDisplay branch={branch} key={branch._id} />
            )
          }
        </GridContainer>
      </div>
    </div>
  );
}
