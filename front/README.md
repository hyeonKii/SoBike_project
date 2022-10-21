# 쏘바이크

## 프론트엔드

<br/>

### 사용기술

<div> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  
</div>

<br/>

### 기술 사용 이유

- 웹페이지의 스타일을 위해 `CSS`를 주로 사용하고 `bootstrap`과 `styled-components`을 보조로 사용
- 그래프의 시각화를 위해 `recharts` 사용
- response timeout처리를 해주고 promise기반이로 만들어져 데이터를 다루는 것이 편리하여 `axios`를 사용 

<br/>

### 프론트 테스트 설정

- `front`폴더에서 `npm` 패키지인 yarn 설치 (이미 설치 시 생략)
- `yarn install` 또는 `yarn`을 커맨드 입력하여 `package.json`에 있는 라이브러리를 다 설치
- `yarn start`로 실행

```
npm install yarn 또는 npm i yarn
yarn
yarn start
```

<br/>

### 폴더 구조

|  폴더                  |  구성 코드                |
| --------------------- | ---------------------- |
| carousel              | 매인 배너                |
| chart                 | 그래프                  |
| comment               | 댓글                    |
| css                   | 서비스 소개스타일          |
| introduce             | 서비스 소개               |
| pages                 | 메인, 로그인, 회원가입      |
| review                | 게시판                  |
| search                | 대여소 검색              |
| user                  | 내 정보                 |
| validate              | 유효성 검사                |
| images                | 이미지 모음              |
| json                  | 대여소 데이터             |

<br/>

### 주요 기능

| 기능 코드               | 기능 정의                |
| --------------------- | ---------------------- |
| RegisterForm.js       | 회원가입 정보 입력         |
| LoginForm.js          | 로그인 정보 입력           |
| Header.js             | 상단 네비게이션            |
| Carousel.js           | 매인 배너                |
| Sections.js           | 서브 배너                |
| BikeAnimation.js      | 서브 배너 & 검색 서비스 이동 |
| introduce.js          | 데이터 분석 결과           |
| UserCard.js           | 유저 정보                |
| MyPage.js             | 사용자 닉네임 변경 & 관심 대여소 조회 |
| Search.js             | 대여소 검색               |
| reviewCard.js         | 카드 형식 게시글           |
| reveiwTable.js        | 테이블 형식 게시글         |
| reviewRegisterForm.js | 게시글 작성               |
| reviewDetail.js       | 전체 게시글               |
| commets.js            | 댓글                    |
