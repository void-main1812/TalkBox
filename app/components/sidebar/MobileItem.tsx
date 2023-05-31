"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

import React from "react";

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `
    group
    flex
    gap-x-3
    m-2
    transition
    duration-200
    text-sm
    leading-6
    font-semibold
    w-full
    justify-center
    p-4
    text-gray-500
    hover:text-black
    hover:bg-gray-100
    rounded-xl
    `,
        active && "bg-gray-100 shadow-xl text-black "
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
