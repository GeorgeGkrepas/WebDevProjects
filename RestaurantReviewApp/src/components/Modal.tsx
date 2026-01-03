import { useState } from "react";
import { registerUser } from "./firebase.tsx";

interface ModalProps {
    isOpen?: boolean;
    title?: string;
}

export const Modal = ({ isOpen, title }: ModalProps) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (title === "Sign Up Modal") {
      e.preventDefault();
      try {
        await registerUser(email, password, username);
      }
      catch (error) {
        console.error("Error during registration:", error);
      }
    }
    if (title === "Log In Modal") {
      e.preventDefault();
      // Implement login logic here
    }
  };

  if (isOpen && title === "Sign Up Modal") {
    return (
      <>
        <div className={`bg-teal-950 text-white p-8 rounded-lg shadow-lg w-1/3 mx-auto mt-20 items-center justify-center 
          ${isOpen ? 'block' : 'hidden'}`}>
          <h2 className="text-2xl mb-4 text-center underline">{title}</h2>

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
