import { Login } from "@/components/auth";

export default function Home() {
  const mainUser: string = process.env.MAIN_USER || "";
  const mainPassword: string = process.env.MAIN_PASSWORD || "";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full flex-col max-w-5xl items-center lg:flex">
        <h1 className="w-full my-8 justify-center flex border-b text-4xl border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome! please login to use the Money app!
        </h1>
        <div className="flex p-8 rounded-3x1 ">
        <Login envs={{ mainUser, mainPassword}}/>
        </div>
      </div>
    </main>
  );
}
