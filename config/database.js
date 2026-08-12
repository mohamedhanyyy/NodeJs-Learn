
const mongoose= require('mongoose')

const dbCollection= ()=>{
    mongoose
      .connect(process.env.MONGO_DATABASE_URL)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
}

module.exports= dbCollection
