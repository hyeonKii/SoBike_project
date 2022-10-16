import React, { useState, useContext } from "react";
import { Button, Col, Form, Modal, Card } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
function RegisterReview({ setReviews }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userState = useContext(UserStateContext);
  const [reviewForm, setReviewForm] = useState({
    title: "",
    contents: "",
    locationName: "",
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    // preventDefault 해주기
    e.preventDefault();
    const userId = userState.user.userId; //로그인된 사용자 id
    try {
      const res = await Api.post("reviews", {
        userId,
        ...reviewForm,
        landAddress:"임시",
        roadAddress:"임시2",
      });
      setReviews((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
  };

  return (
    <>
      <button onClick={handleShow}>리뷰등록</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="userEditProfileImage" className="mb-3">
            <Form.Control
              type="file"
              // name="file"
              // method="post"
              // encType="multipart/form-data"
              // onChange={(e) => upload(e)}
            />
          </Form.Group>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                name="title"
                value={reviewForm.title}
                onChange={handleOnchange}
              />
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>locationName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="locationName"
                  name="locationName"
                  value={reviewForm.locationName}
                  onChange={handleOnchange}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="contents"
                type="contents"
                placeholder="contents"
                value={reviewForm.contents}
                onChange={handleOnchange}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterReview;
