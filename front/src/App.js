import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer, LOGIN_SUCCESS } from "./reducer";

import "./App.css";

import Header from "./components/Header";
import LoginForm from "./components/pages/LoginForm";
import { ROUTE } from './components/route'

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const LoginModalContext = createContext(null);
export const AutoLoginContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 로그인 modal 창
  const [show, setShow] = useState(false);

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  //local storage에 사용할 key(토큰 값으로)
  const LS_KEY_LOGIN = "LS_KEY_LOGIN";
  //local storage에 사용할 key(자동 로그인 체크박스 true, false를 값으로)
  const LS_KEY_SAVE_LOGIN = "LS_KEY_SAVE_LOGIN";

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: LOGIN_SUCCESS,
        payload: currentUser,
      });

      // let loginFlag = JSON.parse(localStorage.getItem(LS_KEY_LOGIN))

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    try {
      // 이전에 발급받은 토큰이 로컬에 있다면, 이를 가지고 유저 정보를 받아옴.
      let jwtToken = localStorage.getItem(LS_KEY_LOGIN);
      // 로컬의 토큰을 세션에도 사용.
      sessionStorage.setItem("userToken", jwtToken);

      // 세션의 토큰으로 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: LOGIN_SUCCESS,
        payload: currentUser,
      });
    } catch {
      console.log("%c LocalStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <LoginModalContext.Provider value={{ show, setShow }}>
          <AutoLoginContext.Provider
            value={{ LS_KEY_LOGIN, LS_KEY_SAVE_LOGIN }}
          >
            <Router>
              <Header />
              <LoginForm />
              <Routes>
                <Route path={ ROUTE.MAIN.path } element={ ROUTE.MAIN.element } />
                <Route path={ ROUTE.INTRODUCE.path } element={ ROUTE.INTRODUCE.element } />
                <Route path={ ROUTE.MYPAGE.path } element={ ROUTE.MYPAGE.element } />
                <Route path={ ROUTE.SEARCH.path } element={ ROUTE.SEARCH.element } />
                <Route path={ ROUTE.REVIEW.path } element={ ROUTE.REVIEW.element } />
                <Route path={ ROUTE.REGISTER.path } element={ ROUTE.REGISTER.element } />
              </Routes>
            </Router>
          </AutoLoginContext.Provider>
        </LoginModalContext.Provider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
