// pages/database.tsx

import { Pool, QueryResult } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function getData() {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT version()");
    return response.rows[0];
  } finally {
    client.release();
  }
}

// #######################################################################
/*
interface User {
  id: number;
  name: string;
  password: string;
}

async function getUsers(): Promise<User[]> {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM users";
    const response: QueryResult = await client.query(query);
    return response.rows;
  } finally {
    client.release();
  }
}

export default function Page({ users }: { users: User[] }) {
  return (
    <div>
      <h1>User List:</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            Name: {user.name}, Password: {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const users = await getUsers();
  return { props: { users } };
}
*/
// #######################################################################

interface DatabaseVersion {
  version: string; // Asumiendo que la versión es una cadena
}

export default function Page({ data }: { data: DatabaseVersion }) {
  return (
    <div>
      <h1>Database Version:</h1>
      <p>{data.version}</p>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getData();
  return { props: { data } };
}
