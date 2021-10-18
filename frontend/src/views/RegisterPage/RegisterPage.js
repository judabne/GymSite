import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [firstname, setFirstname] = useState('WAAA3');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  let { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 200);
  const classes = useStyles();
  const { ...rest } = props;

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {

    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (rePassword != password) {
      window.alert("Passwords do not match");
    } else {
      dispatch(register(firstname, lastname, email, password));
    }
    
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={submitHandler} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Create an account</h4>
                  </CardHeader>
                  <p className={classes.divider}><Link to="/login">Have an account? login here</Link></p>
                  {loading && <p className={classes.divider}>Loading...</p>}
                  {error && <p className={classes.divider}><Danger>Error creating an account. Please try again.</Danger></p>}
                  <CardBody>
                    <CustomInput
                      labelText="First Name"
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        onChange: (e) => setFirstname(e.target.value)
                      }}
                    />
                    <CustomInput
                      labelText="Last Name"
                      id="last"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        onChange: (e) => setLastname(e.target.value)
                      }}

                    />
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        onChange: (e) => setEmail(e.target.value)
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        autoComplete: "off",
                        onChange: (e) => setPassword(e.target.value)
                      }}

                    />
                    <CustomInput
                      labelText="Confirm Password"
                      id="rePass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        autoComplete: "off",
                        onChange: (e) => setRePassword(e.target.value)
                      }}
                      
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
