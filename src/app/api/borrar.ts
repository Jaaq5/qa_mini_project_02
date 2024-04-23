// Define la función unsafeQuery
async function unsafeQuery(email: string, password: string) {
  try {
    const queryResult = await pool.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    );
    return queryResult.rows; // Retorna los resultados de la consulta
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
    return queryResult.rows; // Retorna los resultados de la consulta
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llame a la función
  }
}

async function userExist(queryResult: Promise<any>) {
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
