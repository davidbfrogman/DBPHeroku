var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PortfolioBookSchema   = new Schema({
    Id: Schema.ObjectId,
    Title: String,
    Description: String,
    ImageThumbnailURL: String,
    Categories: [],
    IsActive: [],
    Items: [],
    Class: String,
    Subtitle: String,
    IsSingle: Boolean
});

module.exports = mongoose.model('PortfolioBook', PortfolioBookSchema);


    // public class PortfolioBook
    // {
    //     [Key]
    //     public int Id { get; set; }
    //     public string Title { get; set; }
    //     public string Description { get; set; }
    //     public string ImageThumbnailURL { get; set; }
    //     public int Order { get; set; }
    //     public string Category { get; set; }
    //     public bool IsActive { get; set; }
    //     public List<PortfolioItem> Items { get; set; }
    //     public string Class { get; set; }
    //     public string Subtitle { get; set; }
    //     public bool IsSingle { get; set; }
    // }