import jwt from "jsonwebtoken";

const loginRequired = (req, res, next) => {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    
    if(userToken === "null") {
        console.log("서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: 없음");
        res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
        return;
    }

    // 해당 토큰이 정상적인 token인지 확인 -> 토큰에 당김 userId 정보 추출
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);
        const userId = jwtDecoded.userId;

        req.currentUserId = userId;
        
        next();
    } catch(err) {
        res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
        return;
    }
};

export { loginRequired };