const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
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

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    const error = new Error("해당 ID에 대한 장소를 찾지 못했습니다.");
    error.code = 404;
    throw error;
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((place) => place.creator === userId);

  if (!place) {
    const error = new Error("해당 사용자ID에 대한 장소를 찾지 못했습니다.");
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

module.exports = router;
