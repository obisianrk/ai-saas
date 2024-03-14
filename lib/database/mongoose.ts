import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
// [x]
// TODO: need to refer serverfull and serverless architecture
//^ Note: Server Less Action
/*
  In express applications we connect directly to mongodb only once but
  in next js we have to call it on each server action or api request we do
  because next js runs in a server less environment. SLE is state less meaning
  they startup to handle a request and shut down after that without maintaining
  continues connection. this approach ensures that each request got handled independently
  to allow scalability________but this action leads to too many mongodb connections opened
  for each and every actions we performed on server side____to optimize our process will
  resort to caching our connections
*/
interface MongodbConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongodbConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "ai-saas",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
