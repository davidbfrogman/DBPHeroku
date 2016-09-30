var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var PortfolioItemSchema   = new Schema({
    id: Schema.ObjectId,
    portfolioBookId: Number,
    altText: String,
    imageURL: String,
    order: Number,
    width: Number,
    height: Number
});
var PortfolioItem = module.exports.PortfolioItem = mongoose.model('PortfolioItem', PortfolioItemSchema);

var PortfolioCategorySchema   = new Schema({
    id: Schema.ObjectId,
    name: String,
    count: Number,
    filter: String,
    order: Number
});
var PortfolioCategory = module.exports.PortfolioCategory = mongoose.model('PortfolioCategory', PortfolioCategorySchema);

var PortfolioBookSchema   = new Schema({
    id: Schema.ObjectId,
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
var PortfolioBook = module.exports.PortfolioBook = mongoose.model('PortfolioBook', PortfolioBookSchema);