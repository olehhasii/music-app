import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};

export default function Modal({ children }: ModalProps) {
  return (
    <div className="backdrop absolute top-0 left-0 h-full w-full overflow-hidden bg-[#00000086]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
}
