import React from "react";

// React components
import { DualLogin } from "./components/dual-login";
import UsersTable from "./components/users-table";

// Db calls
// Uncomment for local testing
//import localGetUsers from "./lib/local-get-users";

import neonGetUsers from "./lib/neon-get-users";

async function Page() {
  // Uncomment for local testing
  //const users = await localGetUsers();

  const users = await neonGetUsers();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center">
        <DualLogin />
        <UsersTable users={users} />
      </div>
    </div>
  );
}

export default Page;
