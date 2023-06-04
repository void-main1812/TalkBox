"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationId });
  };
  return (
    <div
      className="
  py-4
  px-4
  bg-white
  border-t-[1px]
  flex
  items-center
  gap-2
  lg:gap-4
  "
    >
      <HiPhoto size={25} className="text-gray-500" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a Message"
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-gradient-to-br
            from-gray-400
            to-gray-600
            cursor-pointer
            hover:from-gray-600
            hover:to-gray-400
            transition 
            duration-150
            "
        >
          <HiPaperAirplane size={20} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
