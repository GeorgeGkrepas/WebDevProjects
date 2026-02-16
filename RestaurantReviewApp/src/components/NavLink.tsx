interface NavLinkProps {
  linkName: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const NavLink = ({ linkName, onClick, isActive }: NavLinkProps) => {
  return (
    <button className={`bg-gray-600  text-white font-semibold px-5 py-2 rounded-lg text-base transition duration-200
     hover:bg-gray-700 cursor-pointer ${isActive ? "ring-2 ring-white bg-gray-700" : ""}`} onClick={onClick}>
        {linkName}
    </button>
  )
}
