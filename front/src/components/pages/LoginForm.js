import React, { useContext, useState, useEffect } from "react";
import { LoginContext, DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";

import { Modal, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useContext(DispatchContext);
  const { show, setShow } = useContext(LoginContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //로그인 실패 오류를 생성
  const [loginFail, setLoginFail] = useState(true);

  //모달창 닫힘
  const handleClose = () => {
    setEmail("");
    setPassword("");
    setLoginFail(true);
    setShow(false);
  };

  //아이디 저장 체크박스 컨트롤
  const [saveID, setSaveID] = useState(false);
  //local storage에 사용할 key(이메일을 값으로)
  const LS_KEY_ID = "LS_KEY_ID";
  //local storage에 사용할 key(체크박스 true, false를 값으로)
  const LS_KEY_SAVE_ID = "LS_KEY_SAVE_ID";

  useEffect(() => {
    //체크박스 정보 변수에 초기화, 체크라면 true
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID));
    //체크박스 불린값을 saveID에 초기화
    if (idFlag !== null) setSaveID(idFlag);
    //체그가 안되어 있다면 저장된 아이디를 빈칸으로 교체
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");
    //저장된 아이디 값을 email 값으로 설정
    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setEmail(data);
    console.log(`email 확인:`, email);
  }, []);

  //아이디 저장 체크시
  const handleSaveID = () => {
    localStorage.setItem(LS_KEY_SAVE_ID, !saveID);
    setSaveID(!saveID);
  };

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
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("users/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      //아이디 저장 체크시 LS_KEY_ID에 email 저장
      if (saveID) localStorage.setItem(LS_KEY_ID, email);

      //input 정보 초기화
      setEmail("");
      setPassword("");
      handleClose();

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      setLoginFail(false);
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        onSubmit={handleSubmit}
        style={{ zIndex: 99999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              {!loginFail && (
                <Form.Text className="text-danger">
                  아이디 또는 비밀번호를 잘못 입력했습니다.
                  <br /> 입력하신 내용을 다시 확인해주세요.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <div key="id-checkbox" className="mt-4">
                <Form.Check
                  type="checkbox"
                  id="id-checkbox"
                  label={`이메일 저장`}
                  checked={saveID}
                  onChange={handleSaveID}
                />
              </div>
              <div key="login-checkbox" className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="login-checkbox"
                  label={`자동 로그인`}
                />
              </div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button type="submit" variant="primary" disabled={!isFormValid}>
                로그인
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginForm;
