const util = require("util");
const multer = require("multer");//Limit the file size
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    if (fileExtension.includes("txt")) {
        cb(null, __basedir + "/uploads/txt");
        req.filePath = '/uploads/txt';
    } else if (fileExtension.includes("doc")) {
        cb(null, __basedir + "/uploads/doc")
        req.filePath = '/uploads/doc';
    } else if (fileExtension.includes("xls")) {
        cb(null, __basedir + "/uploads/xls")
        req.filePath = '/uploads/xls';
    }
    
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);    //This is the filename we save into our folder
  }
});

let uploadFile = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    //Check file extension
    const extension = path.extname(file.originalname);
    if (!extension.includes("doc") && !extension.includes("xls") && !extension.includes("txt")) {
        return cb("Invalid File")
    }

    cb(null, true)
  }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;