import { Pool, QueryResult } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function getUsersData(): Promise<any[]> {
  const client = await pool.connect();

  try {
    const response: QueryResult = await client.query("SELECT * FROM users");
    console.log(response.rows);
    return response.rows;
  } finally {
    client.release();
  }
}

export default async function Page(): Promise<void> {
  const usersData: any[] = await getUsersData();
}
