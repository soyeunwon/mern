const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("라우트를 찾지 못했습니다.", 404);
  throw error;
}); // 처리하고자 하는 요청이 아닌 경우에 실행. 요청이 보내지지 않음. (잘못된 EndPoint 등).

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "알 수 없는 에러 발생" });
});

mongoose
  .connect(
    "mongodb+srv://soyeunwondev:Lp432Jh9JUHHzlrO@cluster0.5b1bnup.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5050);
  })
  .catch((error) => {
    console.log(error);
  });
