import React from "react";
import { DualLogin } from "./components/dual-login";
import localGetUsers from "./lib/local-get-users";
import UsersTable from "./components/users-table";

async function Page() {
  const users = await localGetUsers();

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
