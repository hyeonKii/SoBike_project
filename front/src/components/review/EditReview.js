import React, { useState, useContext } from "react";
import { Button, Col, Form, Modal, Card } from "react-bootstrap";
import * as Api from "../../api";

function EditReview({ review, setIsEditing, setReviews }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   const userState = useContext(UserStateContext);
  const [reviewForm, setReviewForm] = useState({
    reviewId: review.reviewId,
    title: review.title,
    contents: review.contents,
    locationName: review.locationName,
    landAddress: "임시",
    roadAddress: "임시2",
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
    const userId = review.userId; //로그인된 사용자 id
    try {
      ///reviews/:reviewId
      const new_review = {
        userId: userId,
        reviewId: reviewForm.reviewId,
        title: reviewForm.title,
        contents: reviewForm.contents,
        locationName: reviewForm.locationName,
      };
      await Api.put(`reviews/${review.reviewId}`, {
        userId,
        ...reviewForm,
      });

      setReviews((prev) => {
        return prev.map((el) => {
          if (el.reviewId === new_review.reviewId) return new_review;
          else return el;
        });
      });
    //   setIsEditing((prev) => !prev);
    } catch (err) {
      console.log("편집에 실패하였습니다.", err);
    }
  };
  //console.log("review_id",review._id)
  //console.log("review reviewId",review.reviewId)
  //삭제 기능
  async function handleDelete() {
    try {
      await Api.delete(`reviews/${review._id}`);  //왜 reviewId 말고 _id가 인식?
      setReviews((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj.reviewId === review.reviewId) return false;
          else return true;
        });
        return newArr;
      });
    } catch (error) {
      console.log("삭제에 실패했습니다.", error);
    }
  }
  return (
    <>
      <button onClick={handleShow}>편집</button>
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
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditReview;
