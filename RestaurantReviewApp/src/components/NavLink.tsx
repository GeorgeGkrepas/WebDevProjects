"use client";

interface NavLinkProps {
  linkName: string;
  onClick?: () => void;
}

export const NavLink = ({ linkName, onClick }: NavLinkProps) => {
  return (
    <button className="bg-gray-600  text-white font-semibold px-5 py-2 rounded-lg text-base transition duration-200
     hover:bg-gray-700 active:bg-gray-800 cursor-pointer" onClick={onClick}>
        {linkName}
    </button>
  )
}
