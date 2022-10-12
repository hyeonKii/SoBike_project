import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container,Row,Form,ButtonGroup,Button,Col,Table} from "react-bootstrap";
import {TbLayoutGrid,TbMenu2,TbTriangle,TbTriangleInverted} from "react-icons/tb";
import * as Api from "../../apiMock";
import ReviewCard from "./ReviewCard";
import { UserStateContext } from "../../App";
import UserTable from "./ReviewTable";
import "./Network.css";
import RegisterReview from "./RegisterReview";
function Review() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showCard, setShowCard] = useState(true);

  
  function toggleShow() {
    setShowCard(!showCard);
  }
  function sortByNameAsc() {
    let newUserNameArray = [...users];
    newUserNameArray = newUserNameArray.sort(
      (a, b) => -a.name.localeCompare(b.name)
    );
    setUsers(newUserNameArray);
  }
  function sortByNameDesc() {
    let newUserNameArray = [...users];
    newUserNameArray = newUserNameArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setUsers(newUserNameArray);
  }
  function CardCount({count}) {
    return <p className="Text">전체 {count}개</p>
  }

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    // if (!userState.user) {
    //   navigate("/login");
    //   return;
    // }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 1, offset: 5 }}>
            <Form className="mb-3">
              <input
                className="search-name"
                type="text"
                value={search}
                placeholder="검색"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
          <Col md={{ span: 1, offset: 5 }}>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="secondary"
                onClick={toggleShow}
                style={
                  showCard
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "white" }
                }
              >
                <TbLayoutGrid
                  style={showCard ? { color: "white" } : { color: "black" }}
                />
              </Button>
              <Button
                variant="secondary"
                onClick={toggleShow}
                style={
                  !showCard
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "white" }
                }
              >
                <TbMenu2
                  style={!showCard ? { color: "white" } : { color: "black" }}
                />
              </Button>
            </ButtonGroup>
            <RegisterReview/>
          </Col>
        </Row>
      </Container>
      {showCard ? (
        <Container fluid="md">
          <CardCount count={users.filter((data) => {if(data.name.includes(search)) return data}).length}/>
          <Row xs="auto" className="justify-content-md-center">
            {users
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (data.name.includes(search)) {
                  return data;
                }
                return ;
              })
              .map((user) => {
                return <ReviewCard key={user.id} user={user} isNetwork />;
              })}
          </Row>
        </Container>
      ) : (
        <Container fluid="md">
          <CardCount count={users.filter((data) => {if(data.name.includes(search)) return data}).length}/>
          <Table className="network-table justify-content-md-center">
            <thead className="table-header">
              <tr>
                <th>
                  Name
                  <span style={{ marginLeft: "10px" }}>
                    <TbTriangle
                      className="triangle-btn-asc"
                      onClick={sortByNameAsc}
                    />
                    <TbTriangleInverted
                      className="triangle-btn-desc"
                      onClick={sortByNameDesc}
                    />
                  </span>
                </th>
                <th>title</th>
                <th>리뷰</th>
              </tr>
            </thead>
            {users
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (data.name.includes(search)) {
                  return data;
                }
                return ;
              })
              .map((user) => {
                return <UserTable key={user.id} user={user} isNetwork />;
              })}
          </Table>
        </Container>
      )}
    </>
  );
}

export default Review;
