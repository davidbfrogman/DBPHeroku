var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var PortfolioCategorySchema   = new Schema({
    Id: Schema.ObjectId,
    Name: String,
    Count: Number,
    Filter: String,
    Order: Number
});

module.exports = mongoose.model('PortfolioCategory', PortfolioCategorySchema);

    // public class PortfolioCategory
    // {
    //     public string Name { get; set; }
    //     public int Count { get; set; }
    //     public string Filter { get; set; }
    //     public int Order { get; set; }
    // }