const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String, // type string
		required: true,
		min: 6, // min length
	},
	email: {
		type: String, // type string
		required: true,
		min: 5, // min length
		max: 255, // max length
	},
	password: {
		type: String, // type string
		required: true,
		max: 1024, // max password length
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);