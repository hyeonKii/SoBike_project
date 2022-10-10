import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Modal, Form, Button } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";


function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <>
      <Nav activeKey={location.pathname}>
        <Nav.Item className="me-auto mb-5">
          <Nav.Link disabled>서비스 이름</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={() => navigate("/introduce")}>
            서비스 소개
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={() => navigate("/search")}>대여소 검색</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={() => navigate("/review")}>리뷰</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={() => navigate("/mypage")}>내정보</Nav.Link>
        </Nav.Item>

        {isLogin ? (
          <Nav.Item>
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
          </Nav.Item>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link onClick={handleShow}>로그인</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={() => navigate("/register")}>회원가입</Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력해주세요."
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호는 4글자 이상입니다."
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
