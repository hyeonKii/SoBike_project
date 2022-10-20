import React from "react";

import Main from "./pages/Main";
import Introduce from "./introduce/Introduce";
import Search from "./search/Search";
import Review from "./review/Review";
import MyPage from "./MyPage";
import RegisterForm from "./pages/RegisterForm";

export const ROUTE = {
  MAIN: {
    path: '/',
    link: '/',
    element: <Main />,
  },
  INTRODUCE: {
    path: '/introduce',
    link: '/introduce',
    element: <Introduce />,
  },
  SEARCH: {
    path: '/search',
    link: '/search',
    element: <Search />,
  },
  REVIEW: {
    path: '/review',
    link: '/review',
    element: <Review/>,
  },
  MYPAGE: {
    path: '/mypage',
    link: '/mypage',
    element: <MyPage />,
  },
  REGISTER: {
    path: '/register',
    link: '/register',
    element: <RegisterForm />
  },
  MAINALL: {
    path: '*',
    link: '*',
    element: <Main />,
  },
}
