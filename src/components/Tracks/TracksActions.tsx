import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';
import CreateTrackForm from '../Forms/CreateTrackForm';

export default function TracksActions() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const handleCloseForm = () => {
    setIsFormOpened(false);
  };

  return (
    <div className="glass mb-2 w-full px-7 py-2">
      <div>
        <button
          className="rounded-lg bg-[#2d2d2d] px-7 py-2 font-bold"
          onClick={() => setIsFormOpened(true)}
        >
          Create Track
        </button>
      </div>
      {isFormOpened &&
        createPortal(
          <Modal isOpen={isFormOpened} onClose={handleCloseForm}>
            <CreateTrackForm onClose={handleCloseForm} />
          </Modal>,
          document.body
        )}
    </div>
  );
}
