import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("wait conecting to the database");

  mongoose
    .connect(
      "mongodb+srv://renatarko:anesio2219@cluster0.wbx3xho.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
