const mongoose = require('mongoose');

const imgSchema = mongoose.Schema({
    imgData: { type: String, required: true },
    imgName: { type: String, required: true }
});

module.exports = mongoose.model('homeImg', imgSchema);