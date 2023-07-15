import React, { Component } from "react";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faUndo,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { withRouter } from "../../services/withRouter";
import authToken from "../../utils/authToken";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: "",
    password: "",
  };

  credentialChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateUser = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/user/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        if (response.data != null) {
          localStorage.setItem("jwtToken", response.data.token);
          authToken(localStorage.getItem("jwtToken"));
          this.props.navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <Row className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <Col xs={5}>
            <Card className="border border-dark bg-dark text-white">
              <Card.Header>
                <FontAwesomeIcon icon={faSignInAlt} /> Đăng nhập
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Group as={Col}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.credentialChange}
                        className="bg-dark text-white"
                        placeholder="Tên người dùng"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.credentialChange}
                        className="bg-dark text-white"
                        placeholder="Mật khẩu"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button size="sm">
                  <Link to="/register" className="nav-link text-white">
                    <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
                  </Link>
                </Button>{" "}
                <Button
                  size="sm"
                  type="button"
                  variant="success"
                  className="text-white"
                  onClick={this.validateUser}
                  disabled={username.length === 0 || password.length === 0}
                >
                  <FontAwesomeIcon icon={faSignInAlt} /> Đăng nhập
                </Button>{" "}
                <Button
                  size="sm"
                  type="button"
                  variant="info"
                  className="text-white"
                  onClick={this.resetLoginForm}
                  disabled={username.length === 0 && password.length === 0}
                >
                  <FontAwesomeIcon icon={faUndo} /> Làm mới
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Login);
