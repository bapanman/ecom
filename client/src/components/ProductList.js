import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Container, Alert } from "reactstrap";

const API_URL = "https://ecom-backend-iu5z.onrender.com";
const LOCAL_URL = "http://localhost:5000";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${API_URL}/products`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.warn(id);
    let result = await fetch(`${API_URL}/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`${API_URL}/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Wellcome to Mandal's Electronics</h3>
      <Container>
        <Input
          type="text"
          className="mb-3"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        {products.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Sl no</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.company}</td>
                    <td>
                      <div>
                        <Button className="mx-2 mb-1" color="primary">
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "white",
                            }}
                            to={"/update/" + item._id}
                          >
                            Update
                          </Link>
                        </Button>
                        <Button
                          className="mx-2 mb-1"
                          color="danger"
                          outline
                          onClick={() => deleteProduct(item._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <Alert color="warning">Sorry ! No result found !</Alert>
        )}
      </Container>
    </div>
  );
};

export default ProductList;
