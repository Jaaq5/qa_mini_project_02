// Client rendering, useState use it
"use client";
//import { pool } from "../db/db_connection.js";
// Local states for components
//import { useState } from "react";
import React, { useState } from "react";

// Define the interface for the login form
interface LoginForm {
  id: number;
  title: string;
}

// Define the component for the login form
const SqlInjectionLogin: React.FC<LoginForm> = ({ id, title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Email:", email);
    //console.log("Password:", password);
    setSubmittedEmail(email);
    setSubmittedPassword(password);

    try {
      // Enviar los datos de inicio de sesión al backend
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Suponiendo que 'email' y 'password' son las variables donde almacenas el correo electrónico y la contraseña del usuario
          password: password,
          id: id,
        }),
      });

      // Verificar si la solicitud fue exitosa (código de estado 200)
      if (response.ok) {
        const data = await response.json();
        //console.log("Hola");
        // Aquí puedes manejar la respuesta exitosa, por ejemplo, actualizar el estado del componente con los datos del usuario
      } else {
        // Si la solicitud no fue exitosa, manejar el error
        const errorData = await response.json();
        console.error("Error:", errorData);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud, manejarlo aquí
      console.error("Error:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  // Handle the SQL injection button
  const SQLInjectionButton = () => {
    setEmail("admin@email.com");
    setPassword("Contrasena' or '1'='1");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor={`${title}-email-address`} className="sr-only">
              Correo electrónico
            </label>
            <input
              id={`${title}-email-address`}
              name={`${title}-email`}
              type="email"
              autoComplete="email"
              required
              maxLength={50} // Limitar la entrada a 50 caracteres
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="micorreo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${title}-password`} className="sr-only">
              Contraseña
            </label>
            <input
              id={`${title}-password`}
              name={`${title}-password`}
              type="password"
              autoComplete="current-password"
              required
              maxLength={50} // Limitar la entrada a 50 caracteres
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar sesión
          </button>
        </div>
      </form>

      {/* SQL injection button*/}
      <div className="mt-4">
        <button
          title="email: admin@email.com / contraseña: Contrasena' or '1'='1 "
          onClick={SQLInjectionButton}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Inyectar sql 👹
        </button>
      </div>
      {/* Show output info */}
      {submittedEmail && submittedPassword && (
        <div className="mt-4">
          <p>Consulta sql ingresada:</p>
          <p>SELECT * FROM users</p>
          <p>WHERE email = '{submittedEmail}'</p>
          <p>AND password = '{submittedPassword}'</p>
        </div>
      )}
    </div>
  );
};

// Define the component for dual login
const DualLogin = () => {
  return (
    <div className=" bg-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-md w-full flex justify-between">
        <SqlInjectionLogin id={1} title="💉Inicio inseguro" />
        <div className="w-8"></div>
        <SqlInjectionLogin id={2} title="✅Inicio seguro" />
      </div>
    </div>
  );
};

export { SqlInjectionLogin, DualLogin };
