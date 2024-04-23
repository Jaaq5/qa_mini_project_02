import React from "react";

interface User {
  id: number;
  email: string;
  password: string;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="mt-4 flex flex-col w-full max-w-md mx-auto">
      <div className="shadow-md rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white">
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
