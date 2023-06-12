import React from "react";
import logo from "../../public/images/user.png";
import Image from "next/image";
import { AuthForm } from "@/app/(site)/components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="sm:mx-auto bg-transparent shadow-none sm:w-full sm:max-w-md flex flex-col sm:bg-white p-10 sm:shadow-2xl rounded-2xl shadow-gray-300 ">
        <Image
          src={logo}
          alt={"login"}
          className="mx-auto w-auto shadow-lg shadow-gray-400 rounded-e-full rounded-s-full"
          height="48"
          width="48"
        />
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 selection:bg-gray-300">
          Welcome to TalkBox
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
