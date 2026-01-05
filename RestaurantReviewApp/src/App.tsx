"use client"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "./components/Navbar"
import { Modal } from "./components/Modal"
import { auth } from "./components/firebase";

function App() {

  const [openModal, setOpenModal] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setOpenModal(null); // Close any open modals when user is logged in
      }
    })
  }, [])

  return (
    <>
      <div className="bg-gray-300 min-h-screen">
        <Navbar openModal={openModal} setOpenModal={setOpenModal} />
        <Modal isOpen={openModal === "login"} title="Log In" />
        <Modal isOpen={openModal === "signup"} title="Sign Up" />
      </div>
    </>
  )
}

export default App
