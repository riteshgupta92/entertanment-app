const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    adult: { type: Boolean, required: true },
    backdrop_path: { type: String },
    genre_ids: [{ type: Number }],
    id: { type: Number, required: true },
    original_language: { type: String },
    original_title: { type: String, required: true },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String, required: true },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    bookmarks: [bookmarkSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;