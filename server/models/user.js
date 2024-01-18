const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //unique로 db의 이메일에 대한 빠른 쿼리 처리
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //기존에 없던 email만 user생성

module.exports = mongoose.model("User", userSchema);
