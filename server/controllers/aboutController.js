import findAbout from "../models/About.js";

export const getAbout = async (req, res, next) => {
  try {
    res.json(await findAbout());
  } catch (e) {
    next(e);
  }
};
