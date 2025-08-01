import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { COOKIE_KEY, MONGO_URI, PORT, MONGO_DB } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import "./config/passport";
import expressSession from "express-session";
import passport from "passport";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://virtual-shelf.far1ca.hackclub.app/",
    credentials: true, // if you use cookies or Authorization headers
  })
);

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_KEY,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(`${MONGO_URI}/${MONGO_DB}`)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
