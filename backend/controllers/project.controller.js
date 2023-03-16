const Project = require("../models/projectModel");

const createProject = (req, res) => {
  Project.create(req.body)
    .then((project) => res.status(201).json(project))
    .catch((err) => res.status(400).json(err));
};

const findAllProjects = (req, res) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(400).json(err));
};

const findOneProject = (req, res) => {
  const { id } = req.params;
  Project.findById(id)
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(400).json(err));
};

const updateProject = (req, res) => {
  const { id } = req.params;
  Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(400).json(err));
};

const deleteProject = (req, res) => {
  const { id } = req.params;
  Project.findByIdAndDelete(id)
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  createProject,
  findAllProjects,
  findOneProject,
  updateProject,
  deleteProject,
};
