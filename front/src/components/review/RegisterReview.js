import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import ReviewRegisterForm from "./ReviewRegisterForm";
const RegisterReviewBtn = styled.button`
  margin-top: 5px;
  text-align: center;
  border: 0;
  background-color: transparent;
  &:hover {
    background-color: rgb(199, 208, 210);
  }
`;

function RegisterReview({ setReviews }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <RegisterReviewBtn onClick={handleShow}>글쓰기</RegisterReviewBtn>
      <Modal show={show} onHide={handleClose} style={{ zIndex: 100000 }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewRegisterForm
            setReviews={setReviews}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterReview;
