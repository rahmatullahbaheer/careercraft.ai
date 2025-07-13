import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

let connection;

const startDB = async () => {
  if (!connection) {
    connection = await mongoose.connect(url);
  }
  return connection;
};

export default startDB;
