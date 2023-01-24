import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import url from "./routes/url";
import send from "./routes/send";

mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());
app.use("/", send);
app.use("/api/short", url);

const mongoDbLocal = "mongodb://127.0.0.1/urlshortener";

mongoose
  .connect(process.env.MONGODB_URI || mongoDbLocal)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("could not connect to MongoDB...", err));

const port = 4000;

app.listen(port, () => console.log(`listening on port ${port}`));
