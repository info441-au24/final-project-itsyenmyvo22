const mongoose = require('mongoose');

async function testConnection() {
    console.log("Testing MongoDB connection...");

    try {
        await mongoose.connect('mongodb+srv://testuser:btsot7@cluster441.dib0a.mongodb.net/cle?retryWrites=true&w=majority&appName=Cluster441');
        console.log("Successfully connected to MongoDB");

        const testSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('Test', testSchema);

        const testDoc = new TestModel({ name: "Connection Test" });
        await testDoc.save();
        console.log("Test document saved:", testDoc);

        const foundDoc = await TestModel.findOne({ name: "Connection Test" });
        console.log("Test document retrieved:", foundDoc);

        await TestModel.deleteOne({ _id: testDoc._id });
        console.log("Test document deleted");

        console.log("MongoDB connection test successful");
    } catch (error) {
        console.error("MongoDB connection test failed", error);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection();

