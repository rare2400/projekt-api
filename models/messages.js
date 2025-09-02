/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const mongoose = require("mongoose");

//user schema
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fyll i namn"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Fyll i e-post"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: [true, "Fyll i meddelande"]
    },
    contacted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;