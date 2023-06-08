"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import React, { Fragment, useMemo, useState } from "react";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enterFrom="translate-x-full"
                  enter="transition transform ease-in-out duration-500"
                  enterTo="translate-x-0"
                  leave="transition transform ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="h-full rounded-tl-xl rounded-bl-xl flex flex-col bg-gray-200 bg-opacity-50 backdrop-blur-md py-6 overflow-y-scroll +-l-[1px] border-gray-300 ">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div
                            className="
                          flex
                          ml-3
                          h-7
                          items-center
                        "
                          >
                            <button
                              onClick={onClose}
                              type="button"
                              className="
                            rounded-md
                            bg-gray-500
                            bg-opacity-10
                            text-gray-400
                            hover:text-gray-500
                            focus:outline-none
                            px-2
                            py-1
                            hover:shadow-inner
                            hover:shadow-gray-300
                            transition
                            duration-200
                            focus:ring-2
                            focus:ring-gray-300
                            "
                            >
                              <span className="sr-only">Close panel</span>
                              <div className="flex justify-center align">
                                <IoClose size={24} />
                                <span className="text-md text-gray-400 font-light">
                                  Esc
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div className="text-lg text-gray-400 font-semibold">
                            {title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                            >
                              <div
                                className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            "
                              >
                                <IoTrash size={20} />
                              </div>
                              <div
                                className="
                            text-sm
                            font-light
                            text-neutral-600
                            "
                              >
                                Delete
                              </div>
                            </div>
                          </div>
                          <div
                            className="
                        w-full
                        pb-5
                        pt-5
                        sm:px-0
                        sm:pt-0
                        "
                          >
                            <dl
                              className="
                          space-y-8
                          px-4
                          sm:px-6
                          sm:space-y-6
                          "
                            >
                              {!data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                  text-sm
                                  font-medium
                                  text-gray-500
                                  sm:w-40
                                  sm:flex-shrink-0
                                  "
                                  >
                                    Email
                                  </dt>

                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt
                                      className="
                                text-sm
                                font-medium
                                text-gray-500
                                sm:w-40
                                sm:flex-shrink-0
                                "
                                    >
                                      Joined
                                    </dt>

                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
