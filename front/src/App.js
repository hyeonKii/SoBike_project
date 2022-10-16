import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

import "./App.css";

import Header from "./components/Header";
import Main from "./components/pages/Main";
import Introduce from "./components/introduce/Introduce";
import Review from "./components/review/Review";
import RegisterForm from "./components/pages/RegisterForm";
import MyPage from "./components/MyPage";
import LoginForm from "./components/pages/LoginForm";
import Search from "./components/search/Search";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const LoginContext = createContext(null);

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

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
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
        <LoginContext.Provider value={{ show, setShow }}>
          <Router>
            <Header />
            <LoginForm />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/introduce" element={<Introduce />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/review" element={<Review />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </Router>
        </LoginContext.Provider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
