interface NavLinkProps {
  linkName: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const NavLink = ({ linkName, onClick, isActive }: NavLinkProps) => {
  return (
    <button className={`bg-yellow-50  text-gray-800 font-semibold px-5 py-2 rounded-lg text-base transition duration-200
     hover:bg-amber-200 cursor-pointer ${isActive ? "ring-2 ring-emerald-500 bg-yellow-50" : ""}`} onClick={onClick}>
        {linkName}
    </button>
  )
}
