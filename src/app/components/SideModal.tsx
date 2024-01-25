"use client";

import { FC, Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { Todo } from "@prisma/client";
import { Dialog, Transition } from "@headlessui/react";
import { TODOInfoList } from "./TODOInfo";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  data: Todo | null;
}

const SideModal: FC<IProps> = ({ isOpen, onClose, data }) => {
  if (!data) {
    return "";
  }
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease=out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-skin-main py-6 shadow-xl theme-dark">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={onClose}
                            type="button"
                            className="rounded-xl bg-skin-main text-skin-additional hover:text-skin-additional-hover focus:outline-none"
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <TODOInfoList data={data} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SideModal;
