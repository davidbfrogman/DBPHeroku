var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var PortfolioItemSchema   = new Schema({
    Id: Schema.ObjectId,
    PortfolioBookId: Number,
    AltText: String,
    ImageURL: String,
    Order: Number,
    Width: Number,
    Height: Number
});
var PortfolioItem = module.exports.PortfolioItem = mongoose.model('PortfolioItem', PortfolioItemSchema);

var PortfolioCategorySchema   = new Schema({
    Id: Schema.ObjectId,
    Name: String,
    Count: Number,
    Filter: String,
    Order: Number
});
var PortfolioCategory = module.exports.PortfolioCategory = mongoose.model('PortfolioCategory', PortfolioCategorySchema);

var PortfolioBookSchema   = new Schema({
    Id: Schema.ObjectId,
    Title: String,
    Description: String,
    ImageThumbnailURL: String,
    Categories: [PortfolioCategorySchema],
    IsActive: Boolean,
    Items: [PortfolioItemSchema],
    Class: String,
    Subtitle: String,
    IsSingle: Boolean
});
var PortfolioBook = module.exports.PortfolioBook = mongoose.model('PortfolioBook', PortfolioBookSchema);