const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var fileSchema = new mongoose.Schema({
    filePath:{
        type:String,
        required:true,
    },
    fileId: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
    }
});

//Export the model
module.exports = mongoose.model('File', fileSchema);