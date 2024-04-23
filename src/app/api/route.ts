import pool from "../lib/local-db-connection";
import { NextResponse } from "next/server";

async function unsafeQuery(email: string, password: string) {
  try {
    const queryResult = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    );
    return queryResult; // Retorna los resultados de la consulta
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llame a la función
  }
}

async function safeQuery(email: string, password: string) {
  try {
    const queryResult = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    return queryResult; // Retorna los resultados de la consulta
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llame a la función
  }
}

async function userExist(queryResult: any) {
  if (queryResult.length > 0) {
    // Si se encuentra un usuario, puedes manejarlo según tus necesidades
    // Aquí podrías abrir una ventana vacía o realizar cualquier otra acción necesaria
    return new Response(JSON.stringify({ message: "Usuario encontrado" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    // Si no se encuentra un usuario, puedes redirigir al usuario a la página de inicio de sesión o manejarlo según tus necesidades
    return new Response(JSON.stringify({ message: "Usuario no encontrado" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
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
    //return Response.error("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Acceder a los datos del cuerpo de la solicitud
    const data = await request.json();

    // Acceder a los campos de correo electrónico y contraseña
    const { id, email, password } = data;

    // Aquí puedes realizar cualquier lógica adicional que necesites, como la validación de los datos
    console.log("Datos recibidos:");
    console.log("FormId:", id);
    console.log("Email:", email);
    console.log("Password:", password);

    // Realizar la consulta a la base de datos para verificar si existe un usuario con el correo electrónico y contraseña proporcionados
    //const queryResult = await pool.query("SELECT * FROM users");
    /*//Forma segura
    const queryResult = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );*/

    /*
    const queryResult = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    );*/

    // Unsafe query
    if (id === 1) {
      const queryResult = (await unsafeQuery(email, password)).rows;
      console.log("Resultado de la consulta:", queryResult);
      return userExist(queryResult);
    } else {
      const queryResult = (await safeQuery(email, password)).rows;
      console.log("Resultado de la consulta:", queryResult);
      return userExist(queryResult);
    }

    // Obtener el resultado de la consulta
    //const queryResult = (await unsafeQuery(email, password)).rows;
    //const result = queryResult.rows;
    //console.log("Resultado de la consulta:", queryResult);

    /*
    if (queryResult.length > 0) {
      // Si se encuentra un usuario, puedes manejarlo según tus necesidades
      // Aquí podrías abrir una ventana vacía o realizar cualquier otra acción necesaria
      return new Response(JSON.stringify({ message: "Usuario encontrado" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } else {
      // Si no se encuentra un usuario, puedes redirigir al usuario a la página de inicio de sesión o manejarlo según tus necesidades
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 404,
        }
      );
    }*/
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

/*
export async function POST() {
  return NextResponse.json({ message: "Hello, World!" });
}
*/

/*
export async function POST(email, password) {
  try {
    const client = await pool.connect();
    const queryResult = await client.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    client.release();

    const user = queryResult.rows[0]; // Tomar el primer usuario encontrado (si hay alguno)

    if (!user) {
      // Si no se encontró ningún usuario, devolver un error
      return Response.error("Credenciales incorrectas", { status: 401 });
    }

    // Si se encontró un usuario, devolver éxito y los detalles del usuario
    console.log(user);
    return Response.json({ user });
  } catch (error) {
    console.error("Error executing query:", error);
    return Response.error("Internal Server Error", { status: 500 });
  }
}
*/

/*
export async function GET(email, password) {
  try {
    const client = await pool.connect();
    const queryResult = await client.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    client.release();

    const data = queryResult.rows;

    if (data.length === 0) {
      // No se encontraron usuarios con el correo electrónico y la contraseña proporcionados
      return Response.error("Usuario no encontrado", { status: 404 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("Error executing query:", error);
    return Response.error("Internal Server Error", { status: 500 });
  }
}
*/
