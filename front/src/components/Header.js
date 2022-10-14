import React, { useContext } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { UserStateContext, DispatchContext, LoginContext } from "../App";

import { Nav } from "react-bootstrap";
import classes from "./Header.css";

import Bike from "../images/Bike.jpeg";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const { setShow } = useContext(LoginContext);

  //모달창 열림
  const handleShow = () => {
    setShow(true);
  };

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
      <header className='header'>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName={classes.active} to="/">
                {/* 쏘바이크 */}
                <a href="">
                  <img className="logo" src={Bike} width="40px" height="40px" />
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/introduce">
                서비스 소개
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/introduce">
                대여소 검색
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/review">
                리뷰
              </NavLink>
            </li>
            {isLogin ? (
              <>
                <li>
                  <NavLink activeClassName={classes.active} to="/mypage">
                    내정보
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName={classes.active} onClick={logout}>
                    로그아웃
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink activeClassName={classes.active} onClick={handleShow}>
                    로그인
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName={classes.active}  to="/register">
                    회원가입
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
