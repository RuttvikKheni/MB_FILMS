const mongoose = require('mongoose');

const clientsSchema = mongoose.Schema({
    clientName: { type: String, required: true },
    clientData: { type: String, required: true }
});

module.exports = mongoose.model('clientDetail', clientsSchema);