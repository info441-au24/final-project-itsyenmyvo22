import mongoose from "mongoose";

let models = {};

console.log("connecting to mongodb")
await mongoose.connect('mongodb+srv://cmle:pU5bUsZKBZKBMUJA@cluster0.sv21o.mongodb.net/cle?retryWrites=true&w=majority&appName=Cluster0')
console.log("Successfully connected to MongoDB");

const postSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: String,
    url: String
});
    
const collectionSchema = new mongoose.Schema({
      username: String,
      collection_name: String,
      products: [String],
      collection_description: String,
      collection_img: String
    });
    
const reviewSchema = mongoose.Schema({
      username: String,
      review: String,
      productID: String,
      rating: Number,
      comments: [String],
      created_date: Date
    });
    
const commentSchema = new mongoose.Schema({
      username: String,
      comment: String,
      created_date: Date
    });


models.Collection = mongoose.model('Collection', collectionSchema);
models.Post = mongoose.model('Post', postSchema);
models.Review = mongoose.model('Review', reviewSchema);
models.Comment = new mongoose.model('Comment', commentSchema);
    
console.log('Mongoose models created');

export default models;
