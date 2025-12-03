import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUserDb = async (payload: Record<string, unknown>) => {
  const { name, role, email, password } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);
  console.log(hashedPassword);

  const result = await pool.query(
    `
      INSERT INTO users(name,role,email,password) VALUES($1, $2, $3, $4) RETURNING *
      `,
    [name, role, email, hashedPassword]
  );
  return result;
};

const getUserDb = async () => {
  const result = await pool.query(`
      SELECT * FROM users
      `);
  return result;
};

const getSingleUserDb = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1
      `,
    [id]
  );
  return result;
};

const updateUserDb = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `
      UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *
      `,
    [name, email, id]
  );
  return result;
};

const deleteUserDb = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1
      `,
    [id]
  );
  return result;
};

export const userServices = {
  createUserDb,
  getUserDb,
  getSingleUserDb,
  updateUserDb,
  deleteUserDb,
};
