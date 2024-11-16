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
    });
    models.Post = mongoose.model('Post', postSchema);

    console.log('Mongoose models created');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

(async () => {
  await connectDatabase();
})();

export default models;
