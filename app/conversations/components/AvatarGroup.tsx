"use client";

import Image from "next/image";
import React from "react";

const AvatarGroup = () => {
  return (
    <>
      <Image
        src={"/images/userGroup.png"}
        width={48}
        height={48}
        className="rounded-full"
        alt="avatarGroup"
      />
    </>
  );
};

export default AvatarGroup;
