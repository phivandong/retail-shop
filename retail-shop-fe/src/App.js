import { Col, Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/item/Cart";
import Item from "./components/item/Item";
import ItemList from "./components/item/ItemList";
import NavBar from "./components/NavBar";
import Login from "./components/user/Login";
import Ordered from "./components/user/Ordered";
import Register from "./components/user/Register";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Col lg={12} className={"margin-top"}>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/ordered" element={<Ordered />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/logout" element={<Login />} />
          </Routes>
        </Col>
      </Container>
    </>
  );
}

export default App;
