"use client";

import Modal from "@/app/components/Modal";
import Button from "@/app/components/button";
import { Input } from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="space-y-12">
          <div
            className="
            border-b 
            border-gray-900/10
            pb-12
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                leading-2
                text-gray-900
                mt-4
                sm:mt-0
                "
            >
              Create a Group Chat
            </h2>
            <p
              className="
            mt-1
            text-sm
            text-gray-500
            font-light
            leading-6
            "
            >
              Create a group chat so that all your friends can chat together
            </p>
            <div
              className="
            mt-10
            flex
            flex-col
            gap-y-8
            "
            >
              <Input
                register={register}
                label="Group Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div
          className="
        mt-6
        flex
        items-center
        justify-end
        gap-x-6
        "
        >
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
