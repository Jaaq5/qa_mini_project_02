import React from "react";

const Page: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Documentación del proyecto 📝</h1>
      <div className="prose lg:prose-xl">
        <h2 className="text-2xl font-bold mb-4">1. Pruebas 🧪</h2>
        <p>
          Para las pruebas realice varios intentos ingresando una{" "}
          <a
            href="https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            lista
          </a>{" "}
          de posibles ataques en el espacio de contraseña de formulario de
          inicio de sesión. De las cuales el inicio inseguro acepto como
          consultas aceptables las siguientes:
        </p>
        <br />
        <img
          src="/sql_injection_queries_tested.webp"
          alt="Consultas sql exitosas"
          className="mb-4 max-w-full h-auto"
        />
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Cambios 🔄</h2>
        <p>
          Existen dos formularios, uno inseguro y otro que no, en el código
          cuando se hace una petición POST existen dos funciones para manejar la
          consulta a base de datos, una llamada unsafeQuery y otra safeQuery
          dentro de la carpeta src/app/api/route.ts. La insegura presenta:
        </p>
        <br />
        <p>1. Una nula validación de las entradas del usuario.</p>
        <p>2. Una nula utilización de consultas preparadas.</p>
        <p>
          3. Una concatenación de entradas usando comillas simples, lo que
          altera la lógica sql.
        </p>
        <br />
        <img
          src="/unsafe_query.webp"
          alt="Funcion unSafeQuery"
          className="mb-4 max-w-full h-auto"
        />
        <p>
          Para el segundo formulario, se utiliza una función llamada safeQuery,
          la cual cuenta con una validación de formato del email y un mínimo de
          caracteres de contraseña, esto es asi solo para esta app de ejemplo,
          se pueden hacer tantas validaciones como sean necesarias para otro
          sistema y para las consultas preparadas se usa $1 y $2 para las
          entradas de usuario, que ya no se concatenan directamente a la
          consulta sql. El código de la función secureQuery es el siguiente:
        </p>
        <br />
        <img
          src="safe_query.webp"
          alt="Funcion safeQuery"
          className="mb-4 max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Page;
