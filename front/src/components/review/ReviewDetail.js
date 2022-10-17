import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Comments from "../comment/Comments";
import { UserStateContext } from "../../App";
import styled from "styled-components";
import { Container, Col, Row } from "react-bootstrap";

const ShowMore =styled.button`
    font-size: 8px;
    border: 0;
    background-color:transparent;
`

function ReviewDetail({ review }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userState = useContext(UserStateContext);
  return (
    <>
      <ShowMore onClick={handleShow}>{'>'}더보기</ShowMore>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {review?.title}
          <br />
          {review?.email}
          {review?.locationName}
          <br />
          {review?.contents}
        </Modal.Body>
        <Modal.Footer>
          <Container fluid>
            <Row>
              <Col>
                <Comments
                  reviewId={review?.reviewId}
                  userId={userState.user?.userId}
                  nickName={userState.user?.nickName}
                  isUser={userState.user}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewDetail;
