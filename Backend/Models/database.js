const  mongoose=require( "mongoose");

const connectDB = async (req, res) => {
    const db = process.env.MONGO_URL;
    const {connection} = await mongoose.connect(db);

    console.log(`MongoDB Connected to ${connection.host}`);

}
module.exports= {connectDB}