require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const nodemailer = require("nodemailer");

const Skill = require("./Models/Skill");
const Project = require("./Models/Project");

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

app.post("/create/project", async (req, res) => {
  try {
    const newProject = new Project({
      name: req.fields.name,
    });
    const result = await cloudinary.uploader.upload(req.files.image.path, {
      folder: `/portfolio/project/${newProject._id}`,
    });
    newProject.image = result;
    await newProject.save();
    res.status(200).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/contact", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: `${req.fields.firstname} ${req.fields.lastname} <${req.fields.email}>`,
    to: process.env.EMAIL_ADDRESS,
    subject: `${req.fields.subject} (sent by ${req.fields.email})`,
    text: req.fields.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Success: " + info.response);
      res.send("success");
    }
  });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started!");
});
