import React, { useEffect, useContext, useState } from "react";
import {
  TbLayoutGrid,
  TbMenu2,
  TbTriangle,
  TbTriangleInverted,
} from "react-icons/tb";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  ListGroup,
  ButtonGroup,
  Button,
  Card,
  Col,
  Table,
} from "react-bootstrap";
import MapContainer from "../map/MapContainer";

import { UserStateContext } from "../../App";
import * as Api from "../../api";
// import { flexbox } from "@mui/system";
import GlobalStyle from "../GlobalStyle";

function Search() {
  const userState = useContext(UserStateContext);
  const [search, setSearch] = useState("");

  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <GlobalStyle />

      <Container fluid className="p-0">
        <div class="RegisterDiv"></div>
        <Row className="justify-content-md-center mt-5">
          <Col md="auto">
            <Form className="mb-3">
              <input
                className="search-name"
                type="text"
                value={search}
                placeholder="대여소 검색"
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "200px" }}
              />
            </Form>
          </Col>
        </Row>
      </Container>

      <Container fluid="md">
        <Row>
          <Col>
            <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
              <Card.Header>검색 결과</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <MapContainer />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Search;
