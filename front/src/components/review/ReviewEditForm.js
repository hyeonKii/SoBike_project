import React, { useState, useContext } from "react";
import { Button, Col, Form, Modal, Row, Card } from "react-bootstrap";
import * as Api from "../../api";
import styled from "styled-components";
import Information from "../../bikeDatas.json";
import Select from "react-select";

function ReviewEditForm({ review, setReviews, handleClose }) {
  const [show, setShow] = useState(false);

  //   const userState = useContext(UserStateContext);
  const [reviewForm, setReviewForm] = useState({
    reviewId: review.reviewId,
    email: review.email,
    title: review.title,
    contents: review.contents,
  });
  const options = Information.map((data) => ({
    value: data.address1,
    label: data.address2,
  }));
  const [locationName, setLocationName] = useState(review.locationName);
  const [roadAddress, setRoadAddress] = useState(review.roadAddress);

  function handleOnchange(e) {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //image
  const [image, setImage] = useState(review.reviewImage);
  const [prevImage, setPrevImage] = useState("");
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const domain = protocol + "//" + hostname + ":5001";
  console.log(review.reviewImage);
  const setPreviewImage = (target) => {
    setPrevImage(URL.createObjectURL(target.files[0]));
    setImage(target);
  };

  const handleSubmit = async (e) => {
    // preventDefault 해주기
    e.preventDefault();
    const userId = review.userId; //로그인된 사용자 id
    try {
      ///reviews/:reviewId
      const new_review = {
        userId: userId,
        reviewImage: image,
        reviewId: reviewForm.reviewId,
        email: reviewForm.email,
        title: reviewForm.title,
        contents: reviewForm.contents,
        locationName: locationName,
        roadAddress: roadAddress,
      };
      const reviewFile = new FormData();
      reviewFile.append("reviewFile", image.files[0]);
      reviewFile.append("userId", userId);
      reviewFile.append("email", reviewForm.email);
      reviewFile.append("title", reviewForm.title);
      reviewFile.append("contents", reviewForm.contents);
      reviewFile.append("locationName", locationName);
      reviewFile.append("roadAddress", roadAddress);
      console.log(locationName);
      console.log(image);
      const res = await Api.put(`reviews/${review.reviewId}`, reviewFile);
      setPreviewImage(res.data.image);
      setReviews((prev) => {
        return prev.map((el) => {
          if (el.reviewId === new_review.reviewId) return new_review;
          else return el;
        });
      });
      //   setIsEditing((prev) => !prev);
    } catch (err) {
      console.log("review 편집에 실패하였습니다.", err);
    }
  };
  //console.log("review_id",review._id)
  //console.log("review reviewId",review.reviewId)
  //삭제 기능
  async function handleDelete() {
    try {
      await Api.delete(`reviews/${review.reviewId}`); //왜 reviewId 말고 _id가 인식?
      setReviews((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj.reviewId === review.reviewId) return false;
          else return true;
        });
        return newArr;
      });
    } catch (error) {
      console.log("review삭제에 실패했습니다.", error);
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {prevImage ? (
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={`${prevImage}`}
            alt="사용자 업로드 이미지"
          />
        ) : (
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={`${domain + image}`}
          />
        )}
        <Form.Group controlId="userEditProfileImage" className="mb-3">
          <Form.Control
            type="file"
            name="reviewFile"
            onChange={(e) => setPreviewImage(e.target)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={reviewForm.title}
            onChange={handleOnchange}
          />
        </Form.Group>
        <Row className="mb-3">
          <fieldset disabled>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                value={reviewForm.email}
                onChange={handleOnchange}
              />
            </Form.Group>
          </fieldset>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>장소</Form.Label>
            <Select
              name="locationName"
              placeholder={locationName}
              options={options}
              onChange={(data) => {
                setLocationName(data.label);
                setRoadAddress(data.value);
              }}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>본문</Form.Label>
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
          </Button>{" "}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>{" "}
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default ReviewEditForm;
