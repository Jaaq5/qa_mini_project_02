// Suponiendo que getUsers es una función asíncrona que realiza una llamada a la API y devuelve los datos
import localGetUsers from "../lib/local-get-users";

async function getUsersData() {
  const users = await localGetUsers();

  if (!users) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch user data");
  }

  return users;
}

export default async function Page() {
  const userData = await getUsersData();

  return (
    <main>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
