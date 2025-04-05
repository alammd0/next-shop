import AppBar from "./components/AppBar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "./lib/auth";


async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}


export default async function Home() {

  const session = await getUser();

  return (
    <div>
      <AppBar />
      {session ? (
        <h1>hello {session.user?.name}</h1>
      ) : (
        <h1>hello guest</h1>
      )}
    </div>
  );
}