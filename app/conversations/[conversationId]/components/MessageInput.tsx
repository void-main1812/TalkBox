"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  placeholder,
  required,
  errors,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
        text-black
        font-light
        py-2
        px-4
        w-full
        rounded-full
        bg-gray-100
        focus:outline-none
        shadow-inner
        shadow-gray-300
        "
      />
    </div>
  );
};

export default MessageInput;
