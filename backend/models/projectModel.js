const mongoose = require("mongoose");
const User = require("./userModel");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
}, {timestamps:true});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;

