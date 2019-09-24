const mongoose = require('mongoose');

const StudentsSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    rollNo: String,
    className: String,
    DOB: String,
    city: String,
    emailId: String,
    phone: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Students', StudentsSchema);