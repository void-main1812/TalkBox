"use client";

import { signOut } from "next-auth/react";
import React from "react";
import logo from "../favicon.ico";
import Image from "next/image";

const Users = () => {
  return (
    <>
      <div className=" sm:mx-auto flex min-h-full w-auto flex-col justify-center gap-8 bg-gray-100">
        <div className="justify-center flex ">
          <Image src={logo} alt="logo" height={48} width={48} />
        </div>
        <p className="font-light text-gray-600 tracking-wide text-center ">
          This Site is Built by{" "}
          <a
            href="https://github.com/void-main1812"
            className="underline hover:text-gray-800"
            target="_blank"
          >
            Void Main
          </a>
        </p>
        <h1 className="text-center text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-700 ">
          WELCOME TO <br /> NEXT AUTH TEMPLATE
        </h1>
        <div className="text-center mb-8 ">
          <span className="text-center bg-white text-gray-600 px-10 py-4 rounded-md shadow-xl shadow-gray-300">
            you can start editing from{" "}
            <span className="text-gray-900">`/app/users/page.tsx`</span>
          </span>
        </div>
        <div className="text-center  ">
          <button
            onClick={() => signOut()}
            className="bg-gradient-to-b from-gray-900 to-gray-700 -translate-y-1 transition hover:translate-y-0 hover:shadow-none text-white shadow-xl shadow-gray-400 font-semibold px-5 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
