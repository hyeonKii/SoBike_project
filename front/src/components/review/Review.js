import React, { useEffect, useContext, useState } from "react";
import {Container,Row,Form,ButtonGroup,Button,Col,Table,ProgressBar} from "react-bootstrap";
import {TbLayoutGrid,TbMenu2,TbTriangle,TbTriangleInverted} from "react-icons/tb";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import ReviewCard from "./ReviewCard";
import ReviewTable from "./ReviewTable";
import RegisterReview from "./RegisterReview";
import GlobalStyle from "../GlobalStyle";
import bicycle from "../../images/Bike.jpeg";

function Review() {
  //const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  // useState 훅을 통해 users 상태를 생성함.
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [showCard, setShowCard] = useState(true);

  function toggleShow() {
    setShowCard(!showCard);
  }
  function sortByNameAsc() {
    let newUserNameArray = [...reviews];
    newUserNameArray = newUserNameArray.sort(
      (a, b) => -a.title.localeCompare(b.title)
    );
    setReviews(newUserNameArray);
  }
  function sortByNameDesc() {
    let newUserNameArray = [...reviews];
    newUserNameArray = newUserNameArray.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setReviews(newUserNameArray);
  }
  function CardCount({ count }) {
    return (
      <div className="Text">
        <div className="mt-4" style={{ float: "left" }}>
          전체 {count}개
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          <img style={{ width: "30px" }} src={bicycle}></img>
          <ProgressBar
            variant="success"
            now={reviews.length}
            label={`${reviews.length}%`}
          />
        </div>
      </div>
    );
  }

  useEffect(() => {
    Api.get("reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);
  console.log("reviews.userId", reviews);
  return (
    <>
      <GlobalStyle />
      <div class="RegisterDiv"></div>
      <Container fluid className="container">
        <Row className="justify-content-md-center mt-5">
          <Col md={{ span: 1, offset: 4 }}>
            <Form className="mb-3">
              <input
                className="search-name"
                type="text"
                value={search}
                placeholder="검색"
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "200px" }}
              />
            </Form>
          </Col>
          <Col md={{ span: 1, offset: 4 }}>
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
            <div>{isLogin && <RegisterReview setReviews={setReviews} />}</div>
          </Col>
        </Row>
      </Container>
      {showCard ? (
        <Container fluid="md" className="container">
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
        <Container fluid="md" className="container">
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
                  title
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
                <th>email</th>
                <th>더보기</th>
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
