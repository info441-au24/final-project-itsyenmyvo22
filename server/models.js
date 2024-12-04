import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

let models = {};

console.log("connecting to mongodb")
await mongoose.connect(process.env.MONGO_DB_CONNECTION)

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
