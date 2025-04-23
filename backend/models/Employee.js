const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true }
);

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;