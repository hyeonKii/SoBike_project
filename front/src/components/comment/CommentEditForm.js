import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CommentEditForm({ Currentcomment, setComments, setIsEditing }) {
  const [commentForm, setCommentForm] = useState({
    reviewId: Currentcomment.reviewId,
    userId: Currentcomment.userId,
    contents: Currentcomment.contents,
    nickName: Currentcomment.nickName,
  });
  
  function handleOnchange(e) {
    const { name, value } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      ///reviews/comment/:commentId
      const id = Currentcomment._id
      await Api.put(`reviews/comment/${id}`, {
        id,
        ...commentForm,
      });
      const comment = {
        _id: id,
        reviewId : commentForm.reviewId,
        userId : commentForm.userId,
        contents: commentForm.contents,
        nickName: commentForm.nickName,
     };
      setComments((prev) => {
        return prev.map((el) => {
          if (el._id === comment._id) return comment;
          else return el;
        });
      });
      setIsEditing((prev) => !prev);
    } catch (error) {
      console.log("comment편집에 실패하였습니다.", error);
    }
  };
  //console.log("Currentcomment",Currentcomment)
  //console.log("Currentcomment.commentId",Currentcomment._id)
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="CommentEditContents">
        <Form.Control
          type="text"
          placeholder="댓글"
          name="contents"
          value={commentForm.contents}
          onChange={handleOnchange}
        />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
                className="edit-cancel-btn"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
