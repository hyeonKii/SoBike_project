import mongoose from "mongoose";
import { User } from "./models/User";
import { UserImage } from "./models/UserImage";
import { Review } from "./models/Review";
import { Comment } from "./models/Comment";

const DB_URL = process.env.MONGODB_URL || "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.js 파일을 확인해 주세요.";

// MongoDB URL 연결
mongoose.connect(DB_URL);
// MongoDB
const db = mongoose.connection;

// MongoDB 연결이 성공 했을 경우 실행.
db.on("connected", () => {
    console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
});
// MongoDB 연결이 에러 났을 경우 실행.
db.on("error", (err) => {
    console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + err);
});

export { User, UserImage, Review, Comment };

