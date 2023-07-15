import {
  faEnvelope,
  faLock,
  faPeopleLine,
  faUndo,
  faUser,
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
import { Component } from "react";
import { withRouter } from "../../services/withRouter";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
  };

  userChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  registerUser = () => {
    let userObject = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    axios
      .post("http://localhost:8080/user/register", userObject)
      .then(() => {
        this.resetRegisterForm();
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      this.props.navigate("/login");
    }, 2000);
  };

  resetRegisterForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { username, password, role, firstName, lastName } = this.state;
    return (
      <div>
        <Row className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <Col xs={5}>
            <Card className="border border-dark bg-dark text-white">
              <Card.Header>
                <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Group as={Col}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.userChange}
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
                        onChange={this.userChange}
                        className="bg-dark text-white"
                        placeholder="Mật khẩu"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

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
                        name="firstName"
                        value={firstName}
                        onChange={this.userChange}
                        className="bg-dark text-white"
                        placeholder="Tên"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

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
                        name="lastName"
                        value={lastName}
                        onChange={this.userChange}
                        className="bg-dark text-white"
                        placeholder="Họ"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPeopleLine} />
                      </InputGroup.Text>
                      <FormControl
                        required
                        autoComplete="off"
                        type="text"
                        name="role"
                        value={role}
                        onChange={this.userChange}
                        className="bg-dark text-white"
                        placeholder="Vai trò"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button
                  size="sm"
                  type="button"
                  variant="success"
                  className="text-white"
                  disabled={
                    this.state.username.length === 0 ||
                    this.state.password.length === 0
                  }
                  onClick={this.registerUser}
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
                </Button>{" "}
                <Button
                  size="sm"
                  type="button"
                  variant="info"
                  className="text-white"
                  onClick={this.resetRegisterForm}
                  disabled={
                    this.state.username.length === 0 &&
                    this.state.password.length === 0
                  }
                >
                  <FontAwesomeIcon icon={faUndo} /> Làm mới
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Register);
