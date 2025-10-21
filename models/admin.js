/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Fyll i användarnamn"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Fyll i lösenord"],
    }
});

//hash password when saving user
userSchema.pre("save", async function (next) {
    try {

        //hashing password if it is new and saving the hashed version
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();

    } catch (error) {
        next(error);
    }
});

//register user
userSchema.statics.register = async function (username, password) {
    try {
        //create user-object and save the user
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//compare saved hashed password with the entered password when user sign in
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

//login user
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });
        //if the user does not exist, throw an error
        if (!user) {
            throw new Error("incorrect username or password");
        }

        //compare entered password with the hashed on
        const isPasswordMatch = await user.comparePassword(password);

        //if the password does not match, throw an error
        if (!isPasswordMatch) {
            throw new Error("incorrect username or password");
        }

        //correct username and password
        return user;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;