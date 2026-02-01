import { Fragment } from "react/jsx-runtime";
import { useAuth } from "../context/auth";
import { NavLink } from "./NavLink"
import { logoutUser } from "./firebase";

interface NavbarProps {
  openModal: "login" | "signup" | null;
  setOpenModal: (modal: "login" | "signup" | null) => void;
  setActiveSection: (section: "reviews" | "analytics" | "profile") => void;
}


export const Navbar = ({ openModal, setOpenModal, setActiveSection }: NavbarProps) => {
  const { currentUser } = useAuth();

  return (
    <>
      <header className="bg-gray-500 sticky top-0 z-20 mx-auto flex w-full items-center justify-between border-b border-gray-500 p-4">
        <div className="text-2xl font-bold text-white">
          Restaurant Reviews
        </div>

        <div className="flex gap-4 text-base">
          {currentUser !==null && currentUser.emailVerified && <Fragment>
            <NavLink linkName="Reviews" onClick={() => setActiveSection("reviews")} />
            <NavLink linkName="Analytics" onClick={() => setActiveSection("analytics")} />
            <NavLink linkName="Profile" onClick={() => setActiveSection("profile")} />
          </Fragment>}
        </div>

        <div className="text-base flex gap-4">
          {currentUser === null && <Fragment>
            <NavLink linkName="Log In" onClick={() => openModal === "login" ? setOpenModal(null) : setOpenModal("login")} />
            <NavLink linkName="Sign Up" onClick={() => openModal === "signup" ? setOpenModal(null) : setOpenModal("signup")} />
          </Fragment>}
          {currentUser !== null && <Fragment>
            <span className="text-white">Hello, {currentUser?.username}! {currentUser.emailVerified ? " ✅" : " ❌"}</span>
            <NavLink linkName="Log Out" onClick={() => {logoutUser()}} />
          </Fragment>}
        </div>
      </header>
    </>
  )
}
