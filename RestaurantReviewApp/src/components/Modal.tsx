import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, loginUser, registerUser, verifyUser } from "./firebase.tsx";

interface ModalProps {
    isOpen?: boolean;
    title?: string;
    onClose: () => void;
}

export const Modal = ({ isOpen, title, onClose }: ModalProps) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrorMsg(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resetForm();
      }
    })
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (title === "Sign Up") { // Sign Up Modal Functionality
      e.preventDefault();
      try {
        await registerUser(email, password, username)
        .then(async () => {
          await verifyUser().then(() => {
            console.log("Verification email sent");
          }).catch((error) => {
            console.error("Error sending verification email:", error);
          });
        });
      }
      catch (error) {
        console.error("Error during registration:", error);
        setErrorMsg(error instanceof Error ? error.message : "An unknown error occurred");
      }
    }
    if (title === "Log In") { // Log In Modal Functionality
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      
      <div className="relative bg-white text-black w-full max-w-md rounded-xl shadow-2xl border border-slate-300 p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl cursor-pointer">
          <img src="../images/RedX.png" alt="Delete" className="w-6 h-6" />
        </button>

        <h2 className="text-xl sm:text-2xl mb-6 text-center font-semibold">
          {title}
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errorMsg}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          {/* Only for Sign Up */}
          {title === "Sign Up" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium transition p-3 rounded-md"
          >
            {title === "Sign Up" ? "Create Account" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
