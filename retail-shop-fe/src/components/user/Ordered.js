import axios from "axios";
import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

class Ordered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getOrderedList();
  }

  getOrderedList = () => {
    axios
      .get("http://localhost:8080/user/get-cart")
      .then((response) => {
        if (response.data != null) {
          this.setState({
            items: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("Error - ", error);
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
                  {/* <th width="10%">Số lượng</th> */}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Không có sản phẩm nào.</td>
                  </tr>
                ) : (
                  items.map((item, inx) => (
                    <tr key={inx}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      {/* <td>{item.quantity}</td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Ordered;
