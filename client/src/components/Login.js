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
  Spinner,
} from "reactstrap";
import { axiosConnect } from "../services/helper";

const LOGIN_API_URL = "/login";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage?.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const defaultUserDataState = {
    email: "",
    password: "",
    isLoader: false
  };

  const defaultErrorState = {
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
    // console.log(JSON.stringify(errorStateData));
  };

  // Reset user signup form
  const resetLoginForm = () => {
    setUserStateData({ ...defaultUserDataState });
    setErrorStateData({ ...defaultErrorState });
  };

  // Submit signup form
  const submitLoginForm = async (event) => {
    event.preventDefault();
    // console.log("submit form called", userStateData);
    // invoke server api
    setUserStateData({...userStateData, isLoader: true}) // activate loader
    axiosConnect
      .post(LOGIN_API_URL, userStateData)
      .then((res) => {
        let result = res?.data;
        console.warn("res from api:", result);
        setUserStateData({...defaultUserDataState })
        if (result?.auth) {
          localStorage.setItem("user", JSON.stringify(result?.user));
          localStorage.setItem("token", JSON.stringify(result?.auth));
          navigate("/");
          alert("User Logged in successfully !!");
        }
      })
      .catch((error) => {
        console.error("error while login: ", error);
        // const data = error?.response?.data;
        setUserStateData({...userStateData, isLoader: false})
        alert("Login unsuccessfull !! try again !!");
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
            <CardTitle tag="h3" className="jus">
              Login
            </CardTitle>
            <CardSubtitle className="mb-2" tag="h6">
              Please fill the details to Login !
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            {/* Add new form form */}
            <Form onSubmit={(e) => submitLoginForm(e)}>
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
                  {/* sign in btn */}
                  <Button color="dark" disabled={userStateData?.isLoader ? true : false} type="submit" className="m-1">
                    { userStateData?.isLoader && <Spinner size="sm">Loading...</Spinner> }
                    <span> Login </span>
                  </Button>
                  <Button
                    onClick={resetLoginForm}
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

export default Login;
