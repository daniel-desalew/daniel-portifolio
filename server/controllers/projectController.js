import {
  createProject as insertProject,
  deleteProjectById,
  findProjectById,
  findProjects,
  updateProjectById,
} from "../models/Project.js";

export const getProjects = async (req, res, next) => {
  try {
    res.json(await findProjects());
  } catch (e) {
    next(e);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const p = await findProjectById(req.params.id);
    if (!p) return res.status(404).json({ message: "Project not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};

export const createProject = async (req, res, next) => {
  try {
    res.status(201).json(await insertProject(req.body));
  } catch (e) {
    next(e);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const p = await updateProjectById(req.params.id, req.body);
    if (!p) return res.status(404).json({ message: "Project not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectById(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
