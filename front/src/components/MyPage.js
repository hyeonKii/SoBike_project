import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import UserLikeList from "./user/UserLikeList";

import "./MyPage.css";
import styled from "styled-components";

const RegisterDiv=styled.div `
  background-color: rgba(1, 1, 1, 0.5);
  width: 100%;
  height: 80px;
  z-index:-1;
  `

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
   
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    console.log({portfolioOwner});
    console.log(userState);
    console.log([params.userId]);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      console.log(ownerId);
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.userId;
      console.log(ownerId);
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <>
      <RegisterDiv></RegisterDiv>
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
              {/* <Card 
                className="rentalCard"
                style={{ 
                  width: '800px', 
                  height: "150px",
                  boxShadow: "7px 7px 39px rgba(243, 228, 246, 1)",
                  border: "none",
                  borderRadius: "20px"
                  }}>
                <Card.Body>
                  <Card.Title>대여소 이름</Card.Title>
                  <Card.Text>
                    서울 특별시 용산구
                  </Card.Text>
                  <Button variant="primary">리뷰</Button>
                </Card.Body>
              </Card> */}
              
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
