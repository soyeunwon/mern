const axios = require("axios");
const HttpError = require("../models/http-error");
const dotenv = require("dotenv");

const processEnv = dotenv.config().parsed;
const API_KEY = processEnv.GOOGLE_API_KEY;

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS")
    throw new HttpError("입력한 주소의 장소를 찾지 못했습니다.", 422);

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;
