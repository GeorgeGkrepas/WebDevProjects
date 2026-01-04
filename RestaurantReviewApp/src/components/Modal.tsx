import { useState } from "react";
import { loginUser, registerUser } from "./firebase.tsx";

interface ModalProps {
    isOpen?: boolean;
    title?: string;
}

export const Modal = ({ isOpen, title }: ModalProps) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (title === "Sign Up Modal") {
      e.preventDefault();
      try {
        await registerUser(email, password, username);
      }
      catch (error) {
        console.error("Error during registration:", error);
        setErrorMsg(error instanceof Error ? error.message : "An unknown error occurred");
      }
    }
    if (title === "Log In Modal") {
      e.preventDefault();
      try {
        await loginUser(email, password);
      }
      catch (error) {
        console.error("Error during login:", error);
        setErrorMsg(error instanceof Error ? error.message : "An unknown error occurred");
      }
    }
  };

  if (isOpen && title === "Sign Up Modal") {
    return (
      <>
        <div className={`bg-teal-950 text-white p-8 rounded-lg shadow-lg w-1/3 mx-auto mt-20 items-center justify-center 
          ${isOpen ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl mb-4 text-center underline">{title}</h2>

          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded text- outline"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded text-white outline"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded text-white outline"
              required
            />

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 transition p-2 rounded"
            >
              Create Account
            </button>
          </form>
        </div>
      </>
    )
  }
  else if (isOpen && title === "Log In Modal") {
    return (
      <>
        <div className={`bg-teal-950 text-white p-8 rounded-lg shadow-lg w-1/3 mx-auto mt-20 items-center justify-center 
          ${isOpen ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl mb-4 text-center underline">{title}</h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded text-white outline"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded text-white outline"
              required
            />

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 transition p-2 rounded"
            >
              Create Account
            </button>
          </form>
        </div>
      </>
    )
  }
}
