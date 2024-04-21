// Client rendering, useState use it
"use client";
//import { pool } from "../db/db_connection.js";
// Local states for components
import { useState } from "react";

// Define the interface for the login form
interface LoginForm {
  title: string;
}

// Define the component for the login form
const SqlInjectionLogin: React.FC<LoginForm> = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    setSubmittedEmail(email);
    setSubmittedPassword(password);
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

      {/* Show output info */}
      {submittedEmail && submittedPassword && (
        <div className="mt-4">
          <p>Output:</p>
          <p>Email: {submittedEmail}</p>
          <p>Password: {submittedPassword}</p>
        </div>
      )}
    </div>
  );
};

// Define the component for dual login
const DualLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex justify-between">
        <SqlInjectionLogin title="💉Inicio inseguro" />
        <div className="w-8"></div>
        <SqlInjectionLogin title="✅Inicio seguro" />
      </div>
    </div>
  );
};

export default DualLogin;
