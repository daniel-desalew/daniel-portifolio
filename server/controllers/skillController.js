import findSkills from "../models/Skill.js";

export const getSkills = async (req, res, next) => {
  try {
    res.json(await findSkills());
  } catch (e) {
    next(e);
  }
};
