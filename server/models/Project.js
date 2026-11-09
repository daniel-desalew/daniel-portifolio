import { query } from "../config/db.js";

const columns = `
  id::text AS "_id",
  title,
  description,
  long_description AS "longDescription",
  image,
  screenshots,
  tech_stack AS "techStack",
  live_url AS "liveUrl",
  github_url AS "githubUrl",
  featured,
  sort_order AS "order",
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

const fields = {
  title: { column: "title", type: "string" },
  description: { column: "description", type: "string" },
  longDescription: { column: "long_description", type: "string" },
  image: { column: "image", type: "string" },
  screenshots: { column: "screenshots", type: "array" },
  techStack: { column: "tech_stack", type: "array" },
  liveUrl: { column: "live_url", type: "string" },
  githubUrl: { column: "github_url", type: "string" },
  featured: { column: "featured", type: "boolean" },
  order: { column: "sort_order", type: "integer" },
};

function invalid(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function parseProject(input, partial = false) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw invalid("Project data must be an object");
  }

  const values = {};
  for (const [key, { column, type }] of Object.entries(fields)) {
    if (!Object.hasOwn(input, key)) continue;
    const value = input[key];

    if (type === "string") {
      if (typeof value !== "string") throw invalid(`${key} must be a string`);
      values[column] = ["title", "description"].includes(key)
        ? value.trim()
        : value;
    } else if (type === "array") {
      if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
        throw invalid(`${key} must be an array of strings`);
      }
      values[column] = JSON.stringify(value);
    } else if (type === "boolean") {
      if (typeof value !== "boolean") throw invalid(`${key} must be a boolean`);
      values[column] = value;
    } else if (type === "integer") {
      if (value !== null && !Number.isInteger(value)) {
        throw invalid(`${key} must be an integer`);
      }
      values[column] = value;
    }
  }

  if (Object.hasOwn(values, "title") && !values.title) {
    throw invalid("title is required");
  }
  if (Object.hasOwn(values, "description") && !values.description) {
    throw invalid("description is required");
  }

  if (!partial) {
    if (!values.title) throw invalid("title is required");
    if (!values.description) throw invalid("description is required");
    values.screenshots ??= "[]";
    values.tech_stack ??= "[]";
    values.long_description ??= "";
    values.image ??= "";
    values.live_url ??= "";
    values.github_url ??= "";
    values.featured ??= false;
    values.sort_order ??= null;
  }

  return values;
}

function parseId(id) {
  if (!/^[1-9]\d*$/.test(String(id))) throw invalid("Invalid project id");
  return String(id);
}

export async function findProjects() {
  const result = await query(
    `SELECT ${columns} FROM projects ORDER BY created_at DESC`,
  );
  return result.rows;
}

export async function findProjectById(id) {
  const result = await query(
    `SELECT ${columns} FROM projects WHERE id = $1`,
    [parseId(id)],
  );
  return result.rows[0] ?? null;
}

export async function createProject(input) {
  const values = parseProject(input);
  const entries = Object.entries(values);
  const result = await query(
    `INSERT INTO projects (${entries.map(([column]) => column).join(", ")})
     VALUES (${entries.map((_, index) => `$${index + 1}`).join(", ")})
     RETURNING ${columns}`,
    entries.map(([, value]) => value),
  );
  return result.rows[0];
}

export async function updateProjectById(id, input) {
  const projectId = parseId(id);
  const values = parseProject(input, true);
  const entries = Object.entries(values);
  if (entries.length === 0) return findProjectById(projectId);

  const assignments = entries.map(
    ([column], index) => `${column} = $${index + 1}`,
  );
  const result = await query(
    `UPDATE projects
     SET ${assignments.join(", ")}, updated_at = NOW()
     WHERE id = $${entries.length + 1}
     RETURNING ${columns}`,
    [...entries.map(([, value]) => value), projectId],
  );
  return result.rows[0] ?? null;
}

export async function deleteProjectById(id) {
  const result = await query("DELETE FROM projects WHERE id = $1", [parseId(id)]);
  return result.rowCount > 0;
}
