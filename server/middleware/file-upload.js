const multer = require("multer");
const uuid = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
}; //Multipurpose Internet Mail Extensions

const fileUpload = multer({
  limits: 500000, //500kb
  storage: multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, "uploads/images");
    }, //파일 저장될 위치를 제어
    filename: (req, file, cd) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cd(null, uuid.v1() + "." + ext);
    },
  }),
});

module.exports = fileUpload;
