const multer = require("multer")
const path = require("path")

//Destination to store
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";
        if (req.baseUrl.includes("users")) {
            folder = "users";

        } else if (req.baseUrl.includes("photos")) {
            folder = "photos";
        }
        cb(null, `uploads/${folder}/`);
    }, filename: (req, file, cb) => {
        const timestamp = Date.now();
        const nameFile = timestamp + path.extname(file.originalname);
        cb(null, nameFile);
    }
})

const imageUpload = multer({
  storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
          // upload only png and jpg formats
          return cb(new Error("Por favor, envie apenas png ou jpg!"));
        }
        cb(undefined,true)
  },
});
module.exports = { imageUpload };