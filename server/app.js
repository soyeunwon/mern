const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

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

app.listen(5050);
