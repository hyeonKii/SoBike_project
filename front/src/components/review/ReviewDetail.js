import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdRoom } from "react-icons/md";
import Comments from "../comment/Comments";
import { UserStateContext } from "../../App";
import styled from "styled-components";
import { Container, Col, Row } from "react-bootstrap";
import GlobalStyle from "../GlobalStyle";
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
      <GlobalStyle/>
      <ShowMore onClick={handleShow}>{'>'}더보기</ShowMore>
      <Modal show={show} onHide={handleClose} style={{zIndex:100000}}>
        <Modal.Header closeButton>
          <Modal.Title>{review?.title}</Modal.Title>
        </Modal.Header>
          <div class="locationbox"><MdRoom/>{review?.locationName}</div>
          <div class="emailbox">작성자: {review?.email}</div>
          <div class="contentbox">{review?.contents}</div>
        
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
