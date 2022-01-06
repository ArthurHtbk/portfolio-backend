require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const Skill = require("./Models/Skill");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.post("/create/skill", async (req, res) => {
  try {
    const newSkill = new Skill({
      name: req.fields.name,
    });
    const result = await cloudinary.uploader.upload(req.files.logo.path, {
      folder: `/portfolio/skill/${newSkill._id}`,
    });
    newSkill.logo = result;
    await newSkill.save();
    res.status(200).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/delete/skill", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.fields._id);
    res.status(200).json("Successfully deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/resume/download", (req, res) => {
  try {
    if (req.query.english === "true") {
      res.status(200).download("./RESUME.pdf");
    } else {
      res.status(200).download("./CV.pdf");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started!");
});
