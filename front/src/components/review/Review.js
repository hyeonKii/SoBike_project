import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  ButtonGroup,
  Button,
  Col,
  Table,
} from "react-bootstrap";
import {
  TbLayoutGrid,
  TbMenu2,
  TbTriangle,
  TbTriangleInverted,
} from "react-icons/tb";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import ReviewCard from "./ReviewCard";
import ReviewTable from "./ReviewTable";
import "./Network.css";
import RegisterReview from "./RegisterReview";
function Review() {
  //const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [reviews, setReviews] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [showCard, setShowCard] = useState(true);

  function toggleShow() {
    setShowCard(!showCard);
  }
  function sortByNameAsc() {
    let newUserNameArray = [...reviews];
    newUserNameArray = newUserNameArray.sort(
      (a, b) => -a.name.localeCompare(b.name)
    );
    setReviews(newUserNameArray);
  }
  function sortByNameDesc() {
    let newUserNameArray = [...reviews];
    newUserNameArray = newUserNameArray.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setReviews(newUserNameArray);
  }
  function CardCount({ count }) {
    return <p className="Text">전체 {count}개</p>;
  }
  useEffect(() => {
    if (!userState.user) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
    Api.get("reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);
  //console.log("reviews.userId",reviews)
  //console.log(userState.user.userId)
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
            {isAdding && <RegisterReview setReviews={setReviews} />}
          </Col>
        </Row>
      </Container>
      {showCard ? (
        <Container fluid="md">
          <CardCount
            count={
              reviews.filter((data) => {
                if (data.title.includes(search)) return data;
              }).length
            }
          />
          <Row xs="auto" className="justify-content-md-center">
            {reviews
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (data.title.includes(search)) {
                  return data;
                }
                return;
              })
              .map((review) => {
                return (
                  <ReviewCard
                    key={review.reviewId}
                    review={review}
                    isEditable={review.userId === userState.user?.userId}
                    setReviews={setReviews}
                    isNetwork
                  />
                );
              })}
          </Row>
        </Container>
      ) : (
        <Container fluid="md">
          <CardCount
            count={
              reviews.filter((data) => {
                if (data.title.includes(search)) return data;
              }).length
            }
          />
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
            {reviews
              .filter((data) => {
                if (search === "") {
                  return data;
                } else if (data.title.includes(search)) {
                  return data;
                }
                return;
              })
              .map((review) => {
                return (
                  <ReviewTable
                    key={review.reviewId}
                    review={review}
                    isEditable={review.userId === userState.user?.userId}
                    setReviews={setReviews}
                    isNetwork
                  />
                );
              })}
          </Table>
        </Container>
      )}
    </>
  );
}

export default Review;
