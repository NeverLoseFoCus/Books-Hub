const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose
const User = require("./User") 

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    bookContent: {
        type: String,
        required: true,
        unique: true
    },
    auth: {type: Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model("Book", bookSchema)