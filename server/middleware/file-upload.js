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
  fileFilter: (req, file, cd) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("유효하지 않은 파일 유형.");
    cd(error, isValid);
  },
});

module.exports = fileUpload;
