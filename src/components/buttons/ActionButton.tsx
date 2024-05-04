import React from "react";
import { IconType } from "react-icons";

interface ActionButtonProps {
  icon: IconType;
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
}) => {
  return (
    <div
      className={`transform duration-500 hover:scale-105 rounded-3xl sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col items-center ${className}`}
    >
      <div className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br to-blue-300 via-blue-200 from-white lg:h-44 lg:w-44 sm:h-32 sm:w-32 md:h-64 md:w-64 justify-evenly shadow-2xl">
        <button
          className="flex h-20 w-20 shrink-0 grow-0 items-center justify-center rounded-full bg-gradient-to-br to-blue-300 via-blue-200 from-white shadow-lg shadow-slate-500 border-4 border-white"
          onClick={onClick}
        >
          <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8 text-white" />
        </button>
        <span className="pt-2 pb-2 text-white flex items-center">{label}</span>
      </div>
    </div>
  );
};

export default ActionButton;
