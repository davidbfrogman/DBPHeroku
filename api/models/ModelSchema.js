var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;

var PortfolioItemSchema   = new Schema({
    portfolioBookId: Number,
    altText: String,
    imageURL: String,
    order: Number,
    width: Number,
    height: Number
});
module.exports.PortfolioItemSchema = PortfolioItemSchema;
module.exports.PortfolioItem = mongoose.model('PortfolioItem', PortfolioItemSchema);

var PortfolioCategorySchema   = new Schema({
    name: String,
    count: Number,
    filter: String,
    order: Number
});
module.exports.PortfolioCategorySchema = PortfolioCategorySchema;
module.exports.PortfolioCategory = mongoose.model('PortfolioCategory', PortfolioCategorySchema);

var PortfolioBookSchema   = new Schema({
    title: String,
    description: String,
    imageThumbnailURL: String,
    categories: [String],
    isActive: Boolean,
    items: [PortfolioItemSchema],
    class: String,
    subtitle: String,
    isSingle: Boolean
});
module.exports.PortfolioBookSchema = PortfolioBookSchema;
module.exports.PortfolioBook = mongoose.model('PortfolioBook', PortfolioBookSchema);