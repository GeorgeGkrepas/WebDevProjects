import { NavLink } from "./NavLink"

interface NavbarProps {
  setOpenModal: (modal: "login" | "signup" | null) => void;
}


export const Navbar = ({ setOpenModal }: NavbarProps) => {
  return (
    <>
        <header className="bg-gray-500 sticky top-0 z-20 mx-auto flex w-full items-center justify-between border-b border-gray-500 p-4">
            <div className="text-2xl font-bold text-white">
                Restaurant Reviews
            </div>
            <div className="text-base flex gap-4">
                <NavLink linkName="Log In" onClick={() => setOpenModal("login")} />
                <NavLink linkName="Sign Up" onClick={() => setOpenModal("signup")} />
            </div>
        </header>
    </>
  )
}
