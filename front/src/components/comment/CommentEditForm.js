import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CommentEditForm({ Currentcomment, setComments, editComments }) {
  const [commentForm, setCommentForm] = useState({
    reviewId: Currentcomment.reviewId,
    userId: Currentcomment.userId,
    contents: Currentcomment.contents,
    nickName: Currentcomment.nickName,
    createdAt: Currentcomment.createdAt,
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
      const cId = Currentcomment.commentId
      const rId =Currentcomment.reviewId
      await Api.put(`reviews/${rId}/comments/${cId}`, {
        cId,
        ...commentForm,
      });
      const comment = {
        commentId: cId,
        reviewId : commentForm.reviewId,
        userId : commentForm.userId,
        contents: commentForm.contents,
        nickName: commentForm.nickName,
        createdAt : commentForm.createdAt,
     };
      setComments((prev) => {
        return prev.map((el) => {
          if (el.commentId === comment.commentId) return comment;
          else return el;
        });
      });
      editComments((prev) => !prev);
    } catch (error) {
      console.log("comment편집에 실패하였습니다.", error);
    }
  };
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
            onClick={() => editComments((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
