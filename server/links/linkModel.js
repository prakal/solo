var mongoose = require('mongoose'),
    crypto   = require('crypto');

var LinkSchema = new mongoose.Schema({
 visits: Number,
 lat: Number,
 lon: Number,
 url: String
});

LinkSchema.pre('save', function(next){
  next();
});

module.exports = mongoose.model('Link', LinkSchema);
