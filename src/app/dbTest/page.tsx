//"use client";
//import getUsersData from "../lib/getUsers";
import localGetUsers from "../lib/local-get-users";

export default async function ShowData() {
  //const data = await getUsersData();
  const data = await localGetUsers();
}
