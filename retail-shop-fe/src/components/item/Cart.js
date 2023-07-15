import { faMoneyCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    let items = [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.map((item) => items.push(item));
    this.setState({
      items: items,
    });
  };

  deleteItem = (itemId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = existingCart.filter(
      (itemInCart) => itemInCart.id !== itemId
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    this.getCart();
  };

  getItems = (itemId, quantity) => {
    axios
      .post("http://localhost:8080/user/buy/" + itemId + "/" + quantity)
      .then((response) => {
        if (response.data != null) {
          this.deleteItem(itemId);
        }
      });
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th width="25%">Giá</th>
                  <th width="10%">Số lượng</th>
                  <th width="25%"></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Không có sản phẩm nào.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td className="d-flex justify-content-center w-100">
                        <ButtonGroup size="sm">
                          <Button
                            variant="outline-danger"
                            className="mx-2"
                            onClick={() => this.deleteItem(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            {"Xoá"}
                          </Button>{" "}
                          <Button
                            variant="outline-success"
                            onClick={() =>
                              this.getItems(item.id, item.quantity)
                            }
                          >
                            <FontAwesomeIcon icon={faMoneyCheck} />{" "}
                            {"Thanh Toán"}
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            {/* {items.length === 0 ? (
              <></>
            ) : (
              <Button
                size="sm"
                variant="outline-success"
                onClick={() => this.getItems()}
              >
                <FontAwesomeIcon icon={faTrash} /> {"Thanh Toán"}
              </Button>
            )} */}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Cart;
