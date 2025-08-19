/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const mongoose = require("mongoose");

//user schema
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fyll i titel"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Fyll i innehåll"],
    },
    ingredients: {
        type: String,
        required: [true, "Fyll i ingredienser"], 
    },
    price: {
        type: Number,
        required: [true, "Fyll i pris"],
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Menu = mongoose.model("Post", menuSchema);
module.exports = Menu;