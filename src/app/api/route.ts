//import { NextResponse } from "next/server";

import pool from "../lib/neon-db-connection";
// Uncomment for local db connection
//import pool from "../lib/local-db-connection";

// Unsafe query function, here you can insert sql injections
async function unsafeQuery(email: string, password: string) {
  try {
    const queryResult = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    );
    return queryResult;
  } catch (error) {
    console.error("unsafeQuery error:", error);
    throw error;
  }
}

// Safe query function, here you cant insert sql injections
async function safeQuery(email: string, password: string) {
  try {
    const queryResult = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    return queryResult;
  } catch (error) {
    console.error("safeQuery error:", error);
    throw error;
  }
}

// Check if user exist, and return a response
async function userExist(queryResult: any) {
  // User found, 200 response
  if (queryResult.length > 0) {
    return new Response(JSON.stringify({ message: "User found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    // User not found, 404 response
    return new Response(JSON.stringify({ message: "User not found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }
}

// Handle the POST request, check if user exist and return a response
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, email, password } = data;

    //console.log("POST data:");
    //console.log("FormId:", id);
    //console.log("Email:", email);
    //console.log("Password:", password);

    // Call unsafeQuery function if first form is used
    if (id === 1) {
      const queryResult = (await unsafeQuery(email, password)).rows;
      //console.log("queryResult:", queryResult);
      return userExist(queryResult);

      // Call unsafeQuery function if first form is used
    } else {
      const queryResult = (await safeQuery(email, password)).rows;
      //console.log("queryResult", queryResult);
      return userExist(queryResult);
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const client = await pool.connect();
    const queryResult = await client.query("SELECT * FROM users");
    client.release();

    const data = queryResult.rows;

    return Response.json({ data });
  } catch (error) {
    console.error("Error executing query:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
