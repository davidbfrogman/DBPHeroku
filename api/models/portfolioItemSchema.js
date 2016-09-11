var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PortfolioItemSchema   = new Schema({
    Id: Schema.ObjectId,
    PortfolioBookId: Number,
    AltText: String,
    ImageURL: String,
    Order: Number,
    Width: Number,
    Height: Number
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);
