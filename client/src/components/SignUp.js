import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  CardHeader,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Spinner
} from "reactstrap";
import { axiosConnect } from "../services/helper";

const SIGNUP_API_URL = "/register";

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage?.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const defaultUserDataState = {
    name: "",
    email: "",
    password: "",
    isLoader: false
  };

  const defaultErrorState = {
    nameError: [],
    emailError: [],
    passwordError: [],
  };

  // User state data
  const [userStateData, setUserStateData] = useState({
    ...defaultUserDataState,
  });

  // Error state
  const [errorStateData, setErrorStateData] = useState({
    ...defaultErrorState,
  });

  // form validators
  const userFormValidator = (key) => {
    // Name - empty validation
    if (key === "name") {
      if (
        validator?.isEmpty(userStateData?.[key]) ||
        userStateData?.[key]?.length < 3
      ) {
        setErrorStateData({
          ...errorStateData,
          nameError: ["Name must be at least 4 characters long"],
        });
      } else {
        setErrorStateData({ ...errorStateData, nameError: [] });
      }
    }
    if (key === "password") {
      if (
        validator?.isEmpty(userStateData?.[key]) ||
        userStateData?.[key]?.length < 5
      ) {
        setErrorStateData({
          ...errorStateData,
          passwordError: ["Password must be at least 6 characters long"],
        });
      } else {
        setErrorStateData({ ...errorStateData, passwordError: [] });
      }
    }
    if (key === "email") {
      if (!validator?.isEmail(userStateData?.[key])) {
        setErrorStateData({
          ...errorStateData,
          emailError: ["Invalid email address"],
        });
      } else {
        setErrorStateData({ ...errorStateData, emailError: [] });
      }
    }
    return;
  };

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    // set state data
    setUserStateData({ ...userStateData, [key]: event?.target?.value });
    // checking input validation
    userFormValidator(key);
    console.log(JSON.stringify(errorStateData));
  };

  // Reset user signup form
  const resetSignUpForm = () => {
    setUserStateData({ ...defaultUserDataState });
    setErrorStateData({ ...defaultErrorState });
  };

  // Submit signup form
  const submitSignupForm = async (event) => {
    event.preventDefault();
    console.log(userStateData);
    // invoke server api
    setUserStateData({...userStateData, isLoader: true}) // activate loader
    axiosConnect
      .post(SIGNUP_API_URL, userStateData)
      .then((res) => {
        let result = res?.data;
        console.warn("res from api:", result);
        setUserStateData({...defaultUserDataState })
        if (result?.auth) {
          localStorage.setItem("user", JSON.stringify(result?.result));
          localStorage.setItem("token", JSON.stringify(result?.auth));
          navigate("/");
          alert("User registered successfully !!");
        }
      })
      .catch((error) => {
        console.log("error while login: ", error);
        const data = error?.response?.data;
        setUserStateData({...userStateData, isLoader: false})
        alert("Register unsuccessfull !! try again !!");
      });
  };
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          color="light"
          style={{
            width: "85%",
          }}
          className="m-2"
        >
          <CardHeader>
            <CardTitle tag="h3">Sign up</CardTitle>
            <CardSubtitle className="mb-2" tag="h6">
              Please fill the details to sign up !
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            {/* Add new form form */}
            <Form onSubmit={(e) => submitSignupForm(e)}>
              {/* Name field */}
              <FormGroup>
                <Label for="name">Name*</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter a name"
                  type="text"
                  required
                  onChange={(e) => handleInputChange(e, "name")}
                  value={userStateData?.name}
                  invalid={errorStateData?.nameError?.length > 0 ? true : false}
                />
                <FormFeedback>{errorStateData?.nameError[0]}</FormFeedback>
              </FormGroup>
              {/* Email field */}
              <FormGroup>
                <Label for="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter an Email Id"
                  type="email"
                  required
                  onChange={(e) => handleInputChange(e, "email")}
                  value={userStateData?.email}
                  invalid={
                    errorStateData?.emailError?.length > 0 ? true : false
                  }
                />
                <FormFeedback>{errorStateData?.emailError[0]}</FormFeedback>
              </FormGroup>
              {/* Password field */}
              <FormGroup>
                <Label for="password">Password*</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter a password"
                  type="password"
                  required
                  onChange={(e) => handleInputChange(e, "password")}
                  value={userStateData?.password}
                  invalid={
                    errorStateData?.passwordError?.length > 0 ? true : false
                  }
                />
                <FormFeedback>{errorStateData?.passwordError[0]}</FormFeedback>
              </FormGroup>

              <Container className="button-section d-flex flex-column align-items-center">
                <Container className="text-center">
                  {/* sign btn */}
                  {/* <Button color="dark" type="submit" className="m-1">
                    Signup
                  </Button> */}
                  <Button color="dark" disabled={userStateData?.isLoader ? true : false} type="submit" className="m-1">
                    { userStateData?.isLoader && <Spinner size="sm">Loading...</Spinner> }
                    <span> Signup </span>
                  </Button>
                  {/* Reset btn */}
                  <Button
                    onClick={resetSignUpForm}
                    color="secondary"
                    type="reset"
                    className="m-1"
                  >
                    Reset
                  </Button>
                </Container>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
