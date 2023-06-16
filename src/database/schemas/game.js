const { Schema } = require('mongoose');

const Game = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    platform: { type: Number, min: 1, max: 3, required: true },
    platform_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now() }
});

module.exports = Game;