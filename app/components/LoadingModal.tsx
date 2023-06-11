"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
            inset-0
            fixed
            bg-opacity-20
            backdrop-blur-md
            transition-opacity
            "
          />
        </Transition.Child>

        <div
          className="
        fixed
        inset-0
        z-50
        overflow-y-auto
        "
        >
          <div
            className="
            flex
            min-h-full
            items-center
            justify-center
            p-4
            text-center
            "
          >
            <Dialog.Panel className="text-xl text-gray-900 font-semibold flex flex-col justify-center items-center">
              <ClipLoader color="#020202" size={40} />
              <span>Loading...</span>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
