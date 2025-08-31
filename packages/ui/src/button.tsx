"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onclick: () => void;
}

export const Button = ({ children, onclick }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className="text-white transition-all cursor-pointer bg-linear-190 from-[#9a86c8] to-[#6a51a6] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2"
    >
      {children}
    </button>
  );
};
