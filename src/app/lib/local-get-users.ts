import pool from "./local-db-connection";

// Get all users from the database
async function localGetUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users");
    //console.log(result.rows);
    return result.rows;
  } finally {
    client.release();
  }
}

export default localGetUsers;
