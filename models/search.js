var mongoose = require("mongoose");

SearchSchema = new mongoose.Schema({
	title: String,
	createdAt: {
		type: Date,
		"default": Date.now()
	}

	});
  module.exports = mongoose.model('Search', SearchSchema);

