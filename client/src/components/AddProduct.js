import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "reactstrap";

const API_URL = "https://ecom-backend-iu5z.onrender.com";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`${API_URL}/add-product`, {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      {/* <Container className="d-flex justify-content-center align-items-center">
        <Card
          color="light"
          style={{
            width: "85%",
          }}
          className="m-2"
        >
          <CardHeader>
            <CardTitle tag="h3">Add Product</CardTitle>
            <CardSubtitle className="mb-2" tag="h6">
              Please fill the details to add new product !
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={addProduct}>
              <FormGroup>
                <Label for="name">Product Name*</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  invalid={error && !name ? true : false}
                />
                <FormFeedback>Enter a valid name</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="price">Product Price*</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="Enter product price"
                  value={price}
                  required
                  min={0}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  invalid={error && !price ? true : false}
                />
                <FormFeedback>Enter a valid price</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="category">Category*</Label>
                <Input
                  type="text"
                  id="category"
                  placeholder="Enter product category"
                  value={category}
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  invalid={error && !category ? true : false}
                />
                <FormFeedback>Enter a valid category</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="name">Product company*</Label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Enter product company"
                  value={company}
                  required
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                  invalid={error && !company ? true : false}
                />
                <FormFeedback>Enter a valid company</FormFeedback>
              </FormGroup>

              <Container className="button-section d-flex flex-column align-items-center">
                <Container className="text-center">
                  {/* add btn */}
      {/* <Button color="primary" outline type="submit" className="m-1">
                    Add product
                  </Button>
                </Container>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container> */}
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;