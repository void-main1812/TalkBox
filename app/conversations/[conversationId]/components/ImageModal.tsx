"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";
import { BiDownload } from "react-icons/bi";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-auto items-center flex justify-center mt-2 mb-2 h-auto">
        <Image
          alt="image"
          className="object-cover rounded-md"
          width={400}
          height={400}
          src={src}
        />
      </div>
      <a
        target="_blank"
        href={src}
        className="text-lg flex items-center justify-start gap-2 text-gray-400 hover:text-gray-700 transition "
        download
      >
        <BiDownload size={35} />
        <span>Download</span>
      </a>
    </Modal>
  );
};

export default ImageModal;
