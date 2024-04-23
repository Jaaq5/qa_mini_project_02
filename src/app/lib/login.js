import pool from "./local-db-connection";

// Manejador de la ruta `/api/login`
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Ejecuta la consulta SQL para verificar las credenciales del usuario
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND password = $2",
        [email, password]
      );

      // Verifica si se encontraron resultados en la consulta
      if (result.rows.length === 1) {
        // Si las credenciales son válidas, devuelve los datos del usuario
        res.status(200).json({
          email: result.rows[0].email,
          password: result.rows[0].password,
        });
      } else {
        // Si las credenciales no son válidas, devuelve un mensaje de error
        res.status(401).json({ error: "Credenciales inválidas" });
      }
    } catch (error) {
      // Si ocurre un error durante la consulta, devuelve un mensaje de error
      console.error("Error al realizar la consulta SQL:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    // Si la solicitud no es POST, devuelve un mensaje de método no permitido
    res.status(405).json({ error: "Método no permitido" });
  }
}
