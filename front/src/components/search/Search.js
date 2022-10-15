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
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Search.css";
// import MapContainer from "./MapContainer";

import { UserStateContext } from "../../App";
import * as Api from "../../api";
// import { flexbox } from "@mui/system";

function Search() {
    const userState = useContext(UserStateContext);
    const [search, setSearch] = useState("");

    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(inputText);
        setInputText("");
    };

    return (
        <Container fluid
            className="container">
      <Row>
        <Col md="3" lg="3">
            <Card 
                className="search" 
                style={{ 
                    width: "20rem",
                    borderColor: "white",
                    marginTop: "20px" 
                    }}
                >
                <Card.Body>
                    <Row className="justify-content-md-left">
                        <h3 style={{fontWeight: "bold"}}>검색</h3>
                        {/* <DropdownButton 
                            id="dropdown-basic-button" 
                            title="분류별 검색"          
                        >
                            <Dropdown.Item href="#/action-1">대여소 검색</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">보관소 검색</Dropdown.Item>
                        </DropdownButton> */}
                    </Row>
                </Card.Body>
            </Card>

            <Card 
                className="searchCard" 
                style={{ 
                    width: "20rem",
                    marginBottom: "10px",
                    border: "none",
                    // borderStyle: "dashed",
                    // borderColor: "#9966FF",
                    borderRadius: "20px" 
                    }}
                >
                <Card.Body>
                    <Row className="justify-content-md-left">
                        {/* <Col>
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
                        </Col> */}
                        <Col>
                        <form 
                            className="inputForm" 
                            onSubmit={handleSubmit}
                            style ={{
                                width: "250px"
                            }}
                            >
                            <h5
                                style={{
                                    marginBottom:"10px",
                                    fontWeight: "bold"
                                }}
                            >지역 검색</h5> 

                            <input
                                placeholder="검색"
                                onChange={onChange}
                                value={inputText}
                                style={{
                                    height: "40px",
                                    borderColor: "#9966FF",
                                    borderRadius: "5px",
                                }}
                                />
                            <Button 
                                type="submit"
                                style={{
                                    height: "40px",
                                    marginLeft: "5px",
                                    marginBottom:"3px",
                                    backgroundColor: "#9966FF",
                                    borderColor: "#9966FF",
                                    borderRadius: "5px"
                                }}
                                >
                                검색
                                </Button>
                            </form>
                        </Col>
                        
                    </Row>
                </Card.Body>
            </Card>

            <Card 
                className="searchResult" 
                style={{ 
                    width: "20rem",
                    border: "none",
                    // borderStyle: "dashed",
                    // borderColor: "#9966FF",
                    borderRadius: "20px" 
                    }}
                >
                <Card.Body>
                    <Row className="justify-content-md-left">
                        <h3 style={{fontWeight: "bold"}}>검색 결과</h3>
                    </Row>
                </Card.Body>
            </Card>
        </Col>


        <Col style={{marginTop: "35px"}}>

            <div
                className="rentalLocation" 
                style={{
                    display:"flex",
                    height:"40px",
                    textAlign: "center",
                    justifyContent:"center",
                    backgroundColor: "#CC99FF",
                    borderRadius: "10px",
                    boxShadow: "7px 7px 39px rgba(227, 193, 235, 1)"

                    }}
            >
            <div style={{
                display: "flex",
                marginTop: "5px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
                }}>대여소 위치
            </div>
          </div>

          <Col
            
            style={{
                display: "flex",
                marginTop: "3rem",
                justifyContent: "center",
            }}
          >
            <Card
                className="mapCard"
                style={{
                    width: '50rem',
                    alignItems: "center",
                    boxShadow: "7px 7px 39px rgba(243, 228, 246, 1)",
                    border: "none",
                    // borderColor: "lightgray",
                    borderRadius: "20px",
                }}
            >
              <Card.Body>

                <Card.Title
                    style={{fontWeight: "bold"}}
                >
                    대여소 위치
                </Card.Title>
   
                {/* <MapContainer searchPlace={place} /> */}
              </Card.Body>
            </Card>
          </Col>


        </Col>
      </Row>
    </Container>

    )
}

export default Search;