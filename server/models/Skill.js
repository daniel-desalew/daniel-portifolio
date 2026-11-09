import { query } from "../config/db.js";

export default async function findSkills() {
  const result = await query(
    `SELECT id::text AS "_id", name, category, level, sort_order AS "order"
     FROM skills
     ORDER BY sort_order ASC, id ASC`,
  );
  return result.rows;
}
