const express = require("express");
const projectRouter = express.Router();
const {
  createProject,
  findAllProjects,
  findOneProject,
  updateProject,
  deleteProject
} = require("../controllers/project.controller");


projectRouter
  .route('/')
  .get(findAllProjects)
  .post(createProject)

projectRouter
  .route('/:id')
  .get(findOneProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = projectRouter;