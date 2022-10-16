function errorMiddleware(error, req, res, next) {
    // 정규표현식 : "\w1b[33m%s\x1b[0m"
    // 
    console.log("\x1b[33m%s\x1b[0m", error);
    res.status(400).send(error.message);
}

export { errorMiddleware };