# 쏘바이크

## 백엔드

### 사용기술
<div> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</div>

### 기술 사용 이유

### 백엔드 테스트 설정

1. MongoDB 서버 구축 (a, b 중 선택)
    
   a. 로컬 서버

      - [공식 문서 참조](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) mongosh 커맨드로 서버가 들어가지면 성공적으로 구축

   b. Atlas 서버
      - [MongoDB Atlas](https://www.mongodb.com/atlas)가입
      - 무료 클러스터 생성 (512MB)
      - SECURITY의 Database Access -> Add New User -> name, password 설정
      - SECURITY 의 Network Access -> Add IP Address -> current IP 등록
      - DEPLOYMENT Databases -> Connect -> Connect your application -> 서버 링크 복사
 
2. `.env`파일 수정
   - 포트번호 등록
   - MongoDB 서버 URL 환경변수에 등록
   - 토큰 키 등록
    ```
    SERVER_PORT=포트번호
    MONGODB_URL="mongodb://localhost:27017" (로컬 서버 연결 예시)
    MONGODB_URL="mongodb+srv://<name>:<password>@cluster0.8akjhnw.mongodb.net/?retryWrites=true&w=majority" (Atlas 서버 연결 예시)
    JWT_SECRET_KEY="토큰키"
    ```

3. Express 실행
   - `back`폴더에서 `npm` 패키지인 yarn 설치 (이미 설치 시 생략)
   - `yarn install` 또는 `yarn`을 커맨드 입력하여 `package.json`에 있는 라이브러리를 다 설치
   - `yarn start`로 실행
   ```
   npm install yarn 또는 npm i yarn
   yarn
   yarn start
   ```
### 폴더 구조
