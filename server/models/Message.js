import { query } from "../config/db.js";

function validateMessage(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    const error = new Error("Message data must be an object");
    error.status = 400;
    throw error;
  }

  const { name, email, message } = input;
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim() : "";
  if (!normalizedName || normalizedName.length > 100) {
    const error = new Error("Name is required and must be 100 characters or fewer");
    error.status = 400;
    throw error;
  }
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    const error = new Error("A valid email address is required");
    error.status = 400;
    throw error;
  }
  if (typeof message !== "string" || !message.trim() || message.length > 3000) {
    const error = new Error("Message is required and must be 3000 characters or fewer");
    error.status = 400;
    throw error;
  }
  return { name: normalizedName, email: normalizedEmail, message };
}

export async function createMessage(input) {
  const values = validateMessage(input);
  const result = await query(
    `INSERT INTO messages (name, email, message)
     VALUES ($1, $2, $3)
     RETURNING
       id::text AS "_id",
       name,
       email,
       message,
       created_at AS "createdAt"`,
    [values.name, values.email, values.message],
  );
  return result.rows[0];
}

export async function findMessages() {
  const result = await query(
    `SELECT
       id::text AS "_id",
       name,
       email,
       message,
       created_at AS "createdAt"
     FROM messages
     ORDER BY created_at DESC`,
  );
  return result.rows;
}
