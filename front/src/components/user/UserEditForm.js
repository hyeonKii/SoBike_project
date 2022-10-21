import React, { useState, useEffect } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";


function UserEditForm({ user, setIsEditing, setUser }) {
  // useState로 nickName 상태를 생성함.
  const [nickName, setnickName] = useState(user.nickName);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 사진 업데이트.
  const [image, setImage] = useState(user.image);
  //미리 볼 사진 url 저장할 state
  const [prevImage, setPrevImage] = useState("");
  
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const domain = protocol + "//" + hostname + ":5001/";
  
  const setPreviewImage= (target) => {
    setPrevImage(URL.createObjectURL(target.files[0]))
    setImage(target);
  };
  
  /////////////////////
  const handleSubmit = async (e) => {
    // preventDefault
    e.preventDefault();
    const userId = user.userId;
    console.log("image : " + user.image);
    const formData = new FormData();
    if(image?.files){
      formData.append('userFile', image.files[0]);
    }
    formData.append("email", email);
    formData.append("nickName", nickName);

    const res = await Api.put(`users/${userId}`, formData);

    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
    //setPreviewImage(res.data.image);
  };

  return (
    <Card 
      className="myInfo"
      style={{
        width: "20rem",
        height:"450px",
        marginTop: "10rem",
        border: "none",
        // borderStyle: "dashed",
        // borderColor: "#9966FF",
        borderRadius: "20px"
      }}
    >
      <Card.Body style={{marginTop: "40px"}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group 
            style={{
              marginLeft: "60px",
              marginBottom: "35px"
            }}>
          {prevImage ? (
            <Card.Img
            style={{ width: "10rem"}}
            className="mb-3"
            src={`${prevImage}`}
            alt="사용자 업로드 프로필 이미지"
            />
          ) : (
            <Card.Img
              style={{ width: "10rem"}}
              className="mb-3"
              src={`${domain + image}`}
              />
          )}
          </Form.Group>
          <Form.Group 
          controlId="EditUserImage"
          className="mb-3"
> 
            <Form.Control
              type="file"
              onChange={(e) => setPreviewImage(e.target)}
              
            />
          </Form.Group>

          <Form.Group controlId="useEditNickName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="닉네임"
              value={nickName}
              onChange={(e) => setnickName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;