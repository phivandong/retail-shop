import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "../../services/withRouter";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.findAllItems();
  }

  findAllItems = () => {
    axios
      .get("http://localhost:8080/item/get-all")
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

  handleClick(itemId) {
    this.props.navigate("/item/" + itemId);
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        {items.length === 0 ? (
          <div align="center">
            <p>No Item Available.</p>
          </div>
        ) : (
          <Container>
            <Row>
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="border border-dark bg-dark text-white m-2"
                  style={{ width: "20%" }}
                >
                  <Card.Img
                    variant="top"
                    src="https://applecenter.com.vn/uploads/cms/16632365567975.jpg"
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                    <Button variant="primary" className="pb-auto">
                      <Link
                        to={"/item/" + item.id}
                        className="text-white text-decoration-none"
                      >
                        Xem chi tiết
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default withRouter(ItemList);
