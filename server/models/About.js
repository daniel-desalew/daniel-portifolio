import { query } from "../config/db.js";

export default async function findAbout() {
  const result = await query(
    `SELECT
       id::text AS "_id",
       name,
       title,
       location,
       bio,
       photo,
       email,
       phone,
       resume_url AS "resumeUrl",
       github,
       linkedin,
       twitter,
       website,
       facts,
       stats
     FROM about
     ORDER BY id ASC
     LIMIT 1`,
  );
  return result.rows[0] ?? null;
}
