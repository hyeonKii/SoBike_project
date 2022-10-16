import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Comments from "../comment/Comments";
import { UserStateContext } from "../../App";
import { Container, Col, Row } from "react-bootstrap";
function ReviewDetail({ review }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userState = useContext(UserStateContext);

  return (
    <>
      <button onClick={handleShow}>리뷰</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {review?.title}
          <br />
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
