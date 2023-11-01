const uploadFile = require("../middlewares/upload");
const fs = require('fs');

const File = require("../models/File")



const upload = async (req, res) => {
  try {
    //Upload file
    await uploadFile(req, res);

    //Check file exist
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    
    //Save data to Database
    const {fileId, description} = req.body
    
    const filePath = req.filePath;
    let newFile = {
        fileId,
        filePath,
        description 
    }
    const response = await File.findOne({fileId});
    if (response) {
      return res.status(500).json({
        message: 'The fildId already exist.'
      })
    } 
    await File.create(newFile);
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      
    });
  } catch (err) {
    res.status(500).send({
        error: err,
        message: `Could not upload the file`,
    });
  }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/uploads/";
  
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
  
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl +"/files/"+ file,
        });
      });
  
      res.status(200).send(fileInfos);
    });
  };
  
  const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };
  
  module.exports = {
    upload,
    getListFiles,
    download,
  };