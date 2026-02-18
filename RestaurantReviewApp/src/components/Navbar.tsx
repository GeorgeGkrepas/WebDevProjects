import { useState } from "react"
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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="bg-slate-600 sticky top-0 z-20 w-full border-b border-gray-500">
      <div className="flex items-center justify-between w-full px-6 py-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-white whitespace-nowrap">
          Restaurant Reviews 🍽️
        </div>

        {/* Desktop Navigation */}
        {currentUser !== null && currentUser.emailVerified && (
          <div className="hidden md:flex gap-8 text-base">
            <NavLink linkName="Reviews" isActive={activeSection === "reviews"} onClick={() => setActiveSection("reviews")}/>
            <NavLink linkName="Analytics" isActive={activeSection === "analytics"} onClick={() => setActiveSection("analytics")}/>
            <NavLink linkName="Friends" isActive={activeSection === "friends"} onClick={() => setActiveSection("friends")} />
            <NavLink linkName="Profile" isActive={activeSection === "profile"} onClick={() => setActiveSection("profile")}/>
          </div>
        )}

        {/* Right Section */}
        <div className="flex gap-6 text-base whitespace-nowrap">
          
          {/* Desktop Auth Buttons */}
          {currentUser === null && (
            <div className="hidden md:flex gap-4">
              <NavLink linkName="Log In" onClick={() => openModal === "login" ? setOpenModal(null) : setOpenModal("login")}/>
              <NavLink linkName="Sign Up" onClick={() => openModal === "signup" ? setOpenModal(null) : setOpenModal("signup")}/>
            </div>
          )}

          {currentUser !== null && (
            <div className="hidden md:block">
              <NavLink linkName="Log Out" onClick={confirmLogout} />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-700 border-t border-gray-500 px-4 py-4 flex flex-col gap-4 text-white">
          
          {currentUser !== null && currentUser.emailVerified && (
            <Fragment>
              <NavLink linkName="Reviews" isActive={activeSection === "reviews"} onClick={() => { 
                setActiveSection("reviews"); closeMobileMenu();
                }}/>
              <NavLink linkName="Analytics" isActive={activeSection === "analytics"} onClick={() => {
                  setActiveSection("analytics");
                  closeMobileMenu();
                }}/>
              <NavLink linkName="Friends" isActive={activeSection === "friends"} onClick={() => {
                  setActiveSection("friends");
                  closeMobileMenu();
                }}/>
              <NavLink linkName="Profile" isActive={activeSection === "profile"} onClick={() => {
                  setActiveSection("profile");
                  closeMobileMenu();
                }}/>
            </Fragment>
          )}

          {currentUser === null && (
            <Fragment>
              <NavLink linkName="Log In" onClick={() => {
                  openModal === "login" ? setOpenModal(null) : setOpenModal("login"); closeMobileMenu();
                }}/>
              <NavLink linkName="Sign Up" onClick={() => {
                  openModal === "signup" ? setOpenModal(null) : setOpenModal("signup"); closeMobileMenu();
                }}/>
            </Fragment>
          )}

          {currentUser !== null && (
            <NavLink linkName="Log Out" onClick={confirmLogout} />
          )}
        </div>
      )}
    </header>
  )
}
