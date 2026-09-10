const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
    name: {type: String, reqiured: true},
    email: {type: String, reqiured: true},
    age:{type: Number, reqiured: true},
    city:{type: String, reqiured: true},
    course:{type: String, reqiured: true},
    phone:{type: Number, reqiured: true},
    },

    {timestamps: true}
);

module.exports = mongoose.model('Student', studentSchema);