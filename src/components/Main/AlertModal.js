import { Dialog } from "@headlessui/react";

const modalAlert = ({ message, isOpen, onclick }) => {
  return (
    <Dialog as="div" className="modalalert" open={isOpen} onClose={onclick}>
      <Dialog.Panel>
        <Dialog.Title>
          {message.title || "Default Title"}
        </Dialog.Title>
        <Dialog.Description>
          {message.content || "Default Content"}
        </Dialog.Description>
        <button onClick={onclick}>
          {message.buttonContent || "Default"}
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default modalAlert;
