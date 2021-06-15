const mongoose = require('mongoose');

const PageCategorySchema = new mongoose.Schema({
    
    name: String,
    photo: String
});

const Category = mongoose.model("categories",PageCategorySchema);

module.exports = Category;