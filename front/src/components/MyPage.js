import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import UserLikeList from "./user/UserLikeList";

import "./MyPage.css";
import GlobalStyle from "./GlobalStyle";

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
   
    const res = await Api.get("users", ownerId);
    const ownerData = res.data;
   
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    
    if (!userState.user) {
      navigate("/", { replace: true });
      return;
    }

    if (params.userId) {
      
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
      
      const ownerId = userState.user.userId;
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <>
      <GlobalStyle />
      <div class="RegisterDiv"></div>
      <Container fluid
        className="container">
        <Row>
          <Col md="3" lg="3">
            <User
              portfolioOwnerId={portfolioOwner.userId}
              isEditable={portfolioOwner.userId === userState.user?.userId}
            />
          </Col>

          <Col style={{marginTop: "70px"}}>
              <div
                className="rentalLocation" 
                style={{
                    display:"flex",
                    height:"40px",
                    textAlign: "center",
                    justifyContent:"center",
                    backgroundColor: "#79c994",
                    borderRadius: "10px",
                    boxShadow: "7px 7px 39px rgba(200, 214, 199, 1)"
                    }}
              >
              <div style={{
                  display: "flex",
                  marginTop: "5px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                  }}
              >
                관심대여소
              </div>
            </div>

            <Col
              style={{
                display: "flex",
                marginTop: "3rem",
                justifyContent: "center",
              }}
            >
              <UserLikeList
                portfolioOwnerId={portfolioOwner.userId}
              />
            </Col>

            

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyPage;
