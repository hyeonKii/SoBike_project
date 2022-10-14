import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Form,
    ButtonGroup,
    Button,
    Card,
    Col,
    Table,
  } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Search.css";
import SearchPlace from "../map/SearchPlace";

import { UserStateContext } from "../../App";
import * as Api from "../../api";

function Search() {
    const userState = useContext(UserStateContext);
    const [search, setSearch] = useState("");

    return (
        <Container fluid>
      <Row>
        <Col md="3" lg="3">
            <Card 
                className="search" 
                style={{ 
                    width: "20rem",
                    borderColor: "white" 
                    }}
                >
                <Card.Body>
                    <Row className="justify-content-md-left">
                        <h3>검색</h3>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title="분류별 검색"          
                        >
                            <Dropdown.Item href="#/action-1">대여소 검색</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">보관소 검색</Dropdown.Item>
                        </DropdownButton>
                    </Row>
                </Card.Body>
            </Card>

            <Card 
                className="searchCard" 
                style={{ 
                    width: "20rem",
                    marginBottom: "10px",
                    borderStyle: "dashed",
                    borderColor: "#9966FF",
                    borderRadius: "5px" 
                    }}
                >
                <Card.Body>
                    <Row className="justify-content-md-left">
                        <Col>
                        <span>지역</span>
                        <input
                            className="search-name"
                            type="text"
                            value={search}
                            placeholder="검색"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </Col>

                        <Col>
                        <span>상세검색</span>    
                        <input
                            className="search-name"
                            type="text"
                            value={search}
                            placeholder="상세검색"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </Col>
                        
                    </Row>
                </Card.Body>
            </Card>

            <Card 
                className="search" 
                style={{ 
                    width: "20rem",
                    borderStyle: "dashed",
                    borderColor: "#9966FF",
                    borderRadius: "5px" 
                    }}
                >
                <Card.Body>
                    <Row className="justify-content-md-left">
                        <h3>검색 결과</h3>
                    </Row>
                </Card.Body>
            </Card>
        </Col>


        <Col>

            <div
                className="rentalLocation" 
                style={{ 
                    textAlign: "center",
                    backgroundColor: "lightblue",
                    borderRadius: "5px",


                    }}
            >
            <h3>대여소 위치</h3>
          </div>

          <Col
            style={{
                marginTop: "3rem",
                marginLeft: "8rem"
            }}
          >
            <Card style={{ width: '50rem' }}>
              <Card.Body>

                <Card.Title>대여소 위치</Card.Title>

                <Card.Text>
                  
                </Card.Text>
                <SearchPlace/>
              </Card.Body>
            </Card>
          </Col>

          

        </Col>
      </Row>
    </Container>

    )
}

export default Search;