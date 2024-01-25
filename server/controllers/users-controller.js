const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      `유저 정보를 가져오는데 실패했습니다. Error Message:${error}`,
      500
    );
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(`유효하지 않은 데이터입니다. Error Message:${error}`, 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError(`가입에 실패했습니다. Error Message:${error}`),
      500
    );
  }

  if (existingUser)
    return next(new HttpError("이미 존재하는 사용자입니다."), 422);

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError(`가입에 실패했습니다. Error Message:${error}`, 500)
    );
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError(`로그인에 실패했습니다. Error Message:${error}`),
      500
    );
  }

  if (!existingUser || existingUser.password !== password)
    return next(
      new HttpError("유효하지 않은 정보입니다. 로그인할 수 없습니다.", 401)
    );

  res.json({
    message: "Logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
