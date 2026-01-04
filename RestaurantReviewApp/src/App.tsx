"use client"
import { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Modal } from "./components/Modal";

function App() {

  const [openModal, setOpenModal] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <div className="bg-gray-300 min-h-screen">
        <Navbar openModal={openModal} setOpenModal={setOpenModal} />
        <Modal isOpen={openModal === "login"} title="Log In Modal" />
        <Modal isOpen={openModal === "signup"} title="Sign Up Modal" />
      </div>
    </>
  )
}

export default App
