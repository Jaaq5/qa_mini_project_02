import { Pool } from "pg";

const pool = new Pool({
  user: "miPrimerUsuario",
  host: "localhost",
  database: "miPrimerBase",
  password: "LXfKJ6E9DAGaGeNByj98",
  port: 5432, // El puerto por defecto de PostgreSQL
});

// Verificar la conexión con la base de datos
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.stack);
  } else {
    console.log("Conexión exitosa con la base de datos");
  }
  release(); // Liberar el cliente
});

export default pool;
