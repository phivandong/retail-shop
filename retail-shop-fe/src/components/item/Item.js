import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { withRouter } from "../../services/withRouter";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    id: "",
    name: "",
    price: "",
  };

  componentDidMount() {
    const itemId = this.props.params.id;
    if (itemId) {
      this.findByItemId(itemId);
    }
  }

  findByItemId = (itemId) => {
    axios
      .get("http://localhost:8080/item/get-item/" + itemId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            price: response.data.price,
          });
        }
      })
      .catch((error) => {
        console.log("Error - ", error);
      });
  };

  // Call after press the button
  addToCart = (id, name, price) => {
    const item = {
      id: id,
      name: name,
      price: price,
    };

    // Get the existingCart Array from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the item following item's id
    const existingItem = existingCart.find(
      (itemInCart) => itemInCart.id === id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        ...item,
        quantity: 1,
      };
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  render() {
    const { id, name, price } = this.state;
    return (
      <div>
        <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <Row>
            <Card
              className="border border-dark bg-dark text-white"
              style={{ width: "50%" }}
            >
              <Card.Img
                variant="top"
                src="https://applecenter.com.vn/uploads/cms/16632365567975.jpg"
              />
            </Card>

            <Card
              className="border border-dark bg-dark text-white"
              style={{ width: "50%" }}
            >
              <Card.Body className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <Card.Title>{name}</Card.Title>
                <Card.Text>{price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => this.addToCart(id, name, price)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Item);
