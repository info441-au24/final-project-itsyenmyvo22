import mongoose from "mongoose";

let models = {};

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb+srv://testuser:btsot7@cluster441.dib0a.mongodb.net/cle?retryWrites=true&w=majority&appName=Cluster441');
    console.log("Successfully connected to MongoDB");

    const postSchema = new mongoose.Schema({
      name: String,
      category: String,
      price: String,
      url: String
    });
    models.Post = mongoose.model('Post', postSchema);

    const collectionSchema = new mongoose.Schema({
      username: String,
      collection_name: String,
      products: [String],
      collection_description: String
    });
    models.Collection = mongoose.model('Collection', collectionSchema);

    const reviewSchema = new mongoose.Schema({
      username: String,
      review: String,
      productID: String,
      rating: Number,
      comments: [String],
      created_date: Date
    });
    models.Review = mongoose.model('Review', reviewSchema);

    const commentSchema = new mongoose.Schema({
      username: String,
      comment: String,
      created_date: Date
    });
    models.Comment = mongoose.model('Comment', commentSchema);

    console.log('Mongoose models created');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

(async () => {
  await connectDatabase();
})();

export default models;
