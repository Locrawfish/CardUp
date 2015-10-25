var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Card = mongoose.model('Card');

var CardSchema = new Schema({
  name: String,
  title: String,
  company: String,
  phone: {
    cell: Number,
    work: Number
  },
  email: String,
  linkedIn: String,
  website: String
});

module.exports = mongoose.model('Card', CardSchema);
