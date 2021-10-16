import React, { useEffect, useState } from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function BranchesSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgFluid,
    
    classes.imgRounded,
    classes.circularImg
  );
  const circular = classNames(
    classes.circular,
    classes.imgRaised,
  )

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/branches");
      setBranches(data);
      console.log("finished fetching");
      console.log(branches);
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
            branches.map(branch =>
              <GridItem xs={12} sm={12} md={4} key={branch._id}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <div className={circular}>
                      <img src={branch.image} alt={branch.city + " image"} className={imageClasses} />
                    </div>

                  </GridItem>
                  <h4 className={classes.cardTitle}>
                    {branch.city}
                    <br />
                  </h4>
                  <CardBody>
                    <p className={classes.description}>
                      {branch.description}
                    </p>
                  </CardBody>
                  <CardFooter />
                </Card>
              </GridItem>
            )
          }
        </GridContainer>
      </div>
    </div>
  );
}
