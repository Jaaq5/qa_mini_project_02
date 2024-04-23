import { QueryResult } from "pg";
import pool from "./neon-db-connection";

interface User {
  id: number;
  email: string;
  password: string;
}

// Get all users from the database
async function neonGetUsers(): Promise<User[]> {
  const client = await pool.connect();

  try {
    const response: QueryResult = await client.query("SELECT * FROM users");
    //console.log(response.rows);
    return response.rows as User[];
  } finally {
    client.release();
  }
}

export default neonGetUsers;
