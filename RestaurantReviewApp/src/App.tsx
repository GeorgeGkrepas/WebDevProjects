"use client"
import { Fragment, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "./components/Navbar"
import { Modal } from "./components/Modal"
import { auth, verifyUser } from "./components/firebase";
import { useAuth } from "./context/auth";

function App() {

  const {currentUser} = useAuth();
  const [openModal, setOpenModal] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setOpenModal(null); // Close any open modals when user is logged in
      }
    })
  }, [])

  if (currentUser !== null && !currentUser.emailVerified) { // Reload user to check email verification status every 5 seconds
    setInterval(() => {
      if (currentUser) {
        auth.currentUser?.reload();
        console.log("Reloaded user to check email verification status");
      }
    }, 5000);
  }

  return (
    <>
      <div className="bg-gray-300 min-h-screen">
        <Navbar openModal={openModal} setOpenModal={setOpenModal} />

        {/* Not logged in */}
        {currentUser === null && <Fragment>
          <Modal isOpen={openModal === "login"} title="Log In" />
          <Modal isOpen={openModal === "signup"} title="Sign Up" />
        </Fragment>}

        {/* Logged in but not verified */}
        {currentUser !== null && !currentUser.emailVerified && <Fragment>
          <div className="mx-auto mt-[calc(50vh-3rem)] -translate-y-1/2 p-4 bg-yellow-200 border border-yellow-400 text-yellow-800 w-full max-w-md rounded text-center">
            Please verify your email address to access the app. A verification email has been sent to {currentUser.email}
          </div>
          
          <button className="mx-auto mt-4 block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={async () => {
              try {
                if (currentUser) {
                  await verifyUser();
                  alert("Verification email sent.");
                }
              } catch (error) {
                console.error("Error sending verification email:", error);
                alert("Failed to send verification email.");
              }
            }}>
            Resend Verification Email
          </button>
        </Fragment>}

        {/* Logged in and verified */}
        {currentUser !== null && currentUser.emailVerified && <Fragment>
          
        </Fragment>}
      </div>
    </>
  )
}

export default App
