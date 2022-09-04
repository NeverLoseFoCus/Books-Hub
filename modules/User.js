const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose
const Book = require("./Book")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    books: [
        {type: Schema.Types.ObjectId, ref: "Book"}
    ],
    favBooks: [
        {type: Schema.Types.ObjectId, ref: "Book"}
    ]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)