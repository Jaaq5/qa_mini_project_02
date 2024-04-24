import React from "react";

// React components
import { DualLogin } from "./components/dual-login";
import UsersTable from "./components/users-table";

// Db calls
import neonGetUsers from "./lib/neon-get-users";
// Uncomment for local testing
//import localGetUsers from "./lib/local-get-users";

async function Page() {
  const users = await neonGetUsers();
  // Uncomment for local testing
  //const users = await localGetUsers();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mt-5 mb-1">
        {/* Github link */}
        <a
          href="https://github.com/Jaaq5/qa_mini_project_02"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Repo
        </a>{" "}
        {/* Documentation link */}
        <a
          href="./doc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Doc
        </a>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <DualLogin />
        <UsersTable users={users} />
      </div>
    </div>
  );
}

export default Page;
