const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "서울 시청",
    description: "설명입니다",
    imageUrl:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    address: "서울 시청 주소~",
    location: { lat: 37.5665, lng: 126.978 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "용산구청",
    description: "설명입니다",
    imageUrl:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    address: "용산구청주소~",
    location: { lat: 37.5311, lng: 126.9815 },
    creator: "u2",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("잘못된 요청입니다. 장소를 찾을 수 없습니다."),
      500
    );
  }

  if (!place) {
    return next(new HttpError("해당 ID에 대한 장소를 찾지 못했습니다.", 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("장소가져오기에 실패했습니다."), 500);
  }

  if (!places || !places.length) {
    return next(
      new HttpError("해당 사용자ID에 대한 장소를 찾지 못했습니다.", 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("유효하지 않은 데이터입니다.", 422)); //express가 비동기로직에서 throw를 제대로 실행못하기 때문에 next로 처리
  }

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://img.freepik.com/free-vector/weather-icons-collection_1167-124.jpg?size=626&ext=jpg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError("장소 생성에 실패했습니다.", 500));
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("유효하지 않은 데이터입니다.", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("오류가 발생했습니다. 장소를 찾을 수 없습니다."),
      500
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError("오류가 발생했습니다. 업데이트를 할 수 없습니다.", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("오류가 발생했습니다1. 삭제할 수 없습니다.", 500)
    );
  }

  try {
    await place.deleteOne();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("오류가 발생했습니다2. 삭제할 수 없습니다.", 500)
    );
  }

  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
