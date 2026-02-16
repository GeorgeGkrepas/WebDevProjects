import { Fragment } from "react/jsx-runtime";
import { useAuth } from "../context/auth";
import { NavLink } from "./NavLink"
import { logoutUser } from "./firebase";
import { useConfirm } from "./ConfirmModal";

interface NavbarProps {
  openModal: "login" | "signup" | null;
  setOpenModal: (modal: "login" | "signup" | null) => void;
  setActiveSection: (section: "reviews" | "analytics" | "friends" | "profile") => void;
  activeSection: "reviews" | "analytics" | "friends" | "profile";
}


export const Navbar = ({ openModal, setOpenModal, setActiveSection, activeSection }: NavbarProps) => {
  const { currentUser } = useAuth();

  const confirm = useConfirm();

  const confirmLogout = async () => {
    if(
        await confirm.confirm({
          title: "Log Out",
          message: 'Are you sure you want to log out?',
          confirmText: "Yes",
          cancelText: "No",
          danger: false,
        })
      ){
        logoutUser();
      }
    }

  return (
    <>
      <header className="bg-gray-500 sticky top-0 z-20 mx-auto flex w-full items-center justify-between border-b border-gray-500 p-4">
        <div className="text-2xl font-bold text-white">
          Restaurant Reviews 🍽️
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 text-base">
          {currentUser !==null && currentUser.emailVerified && <Fragment>
            <NavLink linkName="Reviews" isActive={activeSection === "reviews"} onClick={() => setActiveSection("reviews")} />
            <NavLink linkName="Analytics" isActive={activeSection === "analytics"} onClick={() => setActiveSection("analytics")} />
            <NavLink linkName="Friends" isActive={activeSection === "friends"} onClick={() => setActiveSection("friends")} />
            <NavLink linkName="Profile" isActive={activeSection === "profile"} onClick={() => setActiveSection("profile")} />
          </Fragment>}
        </div>

        <div className="text-base flex gap-4">
          {currentUser === null && <Fragment>
            <NavLink linkName="Log In" onClick={() => openModal === "login" ? setOpenModal(null) : setOpenModal("login")} />
            <NavLink linkName="Sign Up" onClick={() => openModal === "signup" ? setOpenModal(null) : setOpenModal("signup")} />
          </Fragment>}
          {currentUser !== null && <NavLink linkName="Log Out" onClick={() => confirmLogout()} />}
        </div>
      </header>
    </>
  )
}
