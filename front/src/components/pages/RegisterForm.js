import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import "./RegisterForm.css";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //useState로 nickname 상태를 생성함.
  const [nickName, setNickName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 1글자 이상인지 여부를 확인함.
  const isFirstNameValid = firstName.length >= 1;
  const isLastNameValid = lastName.length >= 1;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isFirstNameValid &&
    isLastNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("users", {
        email,
        password,
        nickName,
        firstName,
        lastName,
        nickName,
      });

      // 메인 페이지로 이동함.
      navigate("/");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <Container fluid className="p-0">
      <div className="register-div"></div>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="registerNickname" className="mt-3">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              {!isLastNameValid && (
                <Form.Text className="text-success">
                  닉네임은 1글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="registerLastName" className="mt-3">
                  <Form.Label>성</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {!isLastNameValid && (
                    <Form.Text className="text-success">
                      성은 1글자 이상으로 설정해 주세요.
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="registerFirstName" className="mt-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {!isFirstNameValid && (
                    <Form.Text className="text-success">
                      이름은 1글자 이상으로 설정해 주세요.
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  회원가입
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
